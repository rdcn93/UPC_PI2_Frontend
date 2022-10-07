import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Promocion } from 'src/app/models/promocion';
import { PromocionService } from 'src/app/services/promocion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Dropdown } from 'src/app/models/shared/dropdown';
import { NgbDate, NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-promocion-add-edit',
  templateUrl: './promocion-add-edit.component.html',
  styleUrls: ['./promocion-add-edit.component.scss']
})
export class PromocionAddEditComponent implements OnInit {

  productForm: any;
  nuevoPromocion: boolean = true;
  PromocionId = 0;
  titulo = "Registrar Promoción";
  lstProductos: Array<Dropdown> = [];
  lstProductosTemp: Array<Dropdown> = [];
  selectedItemProducto: number[] = [];
  selectedItems: Array<Dropdown> = [];
  dropdownSettingsProducto: IDropdownSettings = {};
  productosSelectedIds = "";
  productosIds: number[] = [];
  minDate = this.calendar.getToday();
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  destroySubject$: Subject<void> = new Subject();
  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private formbulider: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private PromocionService: PromocionService,
    private productoService: ProductoService,
    private jwtHelper: JwtHelperService,
    private toastr: ToastrService
  ) {
    this.PromocionId = this.route.snapshot.params['id'];

    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.getProductosList();

    this.PromocionId = this.route.snapshot.params['id'];

    if (this.PromocionId != undefined && this.PromocionId != 0) {
      this.nuevoPromocion = false;
      this.titulo = "Editar Promoción";
      this.ProductDetailsToEdit(this.PromocionId);
      this.selectedItemProducto = this.productosIds;
    }

    // this.selectedItems = [{ item_id: 20, item_text: 'Bife Angosto' }];
    
    this.dropdownSettingsProducto = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar Todo',
      unSelectAllText: 'Deseleccionar todo',
      itemsShowLimit: 10,
      searchPlaceholderText: 'Buscar',
      noDataAvailablePlaceholderText: 'Datos no disponibles',
      allowSearchFilter: true
    };

    this.productForm = this.formbulider.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fecInicio: ['', [Validators.required]],
      fecFin: ['', [Validators.required]],
      porcentajeDescuento: ['', [Validators.required]],
      selectedItemProducto: [this.selectedItems]
    });

  }

  getProductosList() {
    this.productoService.getProductos().subscribe({
      next: (productos: Producto[]) => {
        productos.forEach(element => {
          this.lstProductosTemp.push({ item_id: element.id, item_text: element.nombre });
        });

        this.lstProductos = this.lstProductosTemp;
      }, error: (err: HttpErrorResponse) => {
        this.toastr.error(err.error);
      }
    });
  }

  PostProduct(product: Promocion) {
    
    const product_Master = this.productForm.value;
    const fecIni = this.fromDate;
    const fecFin = this.toDate;

    if (fecIni != null && fecIni != undefined) {
      product_Master.fecInicio = new Date(fecIni.year, fecIni.month - 1, fecIni.day);
    } else {
      product_Master.fecInicio = new Date()
    }

    if (fecFin != null && fecFin != undefined) {
      product_Master.fecFin = new Date(fecFin.year, fecFin.month - 1, fecFin.day);
    } else {
      product_Master.fecFin = new Date()
    }

    product_Master.productosIds = [];

    product_Master.selectedItemProducto.forEach((estadoCombo: any) => {
      product_Master.productosIds.push(estadoCombo.item_id);
    });

    if (this.productForm.invalid) {
      alert("Formulario incorrecto");
      return;
    }

    this.PromocionService.createPromocion(product_Master).subscribe({
      next: () => {
        this.router.navigate(['./', 'promocion']);
        this.toastr.success('Promoción registrada correctamente');
      }, error: (err: HttpErrorResponse) => {
        this.toastr.error(err.error);
      }
    });
  }

  Clear(product: Promocion) {
    this.nuevoPromocion = true;
    this.productForm.reset();
  }

  ProductDetailsToEdit(id: number) {
    this.nuevoPromocion = false;
    this.PromocionService.getPromocionById(id).subscribe({
      next: (productResult: any) => {
        this.PromocionId = productResult.id;
        this.productForm.controls['nombre'].setValue(productResult.nombre);
        this.productForm.controls['descripcion'].setValue(productResult.descripcion);
        this.productForm.controls['fecInicio'].setValue(productResult.fecInicio);
        this.productForm.controls['fecFin'].setValue(productResult.fecFin);
        this.productForm.controls['porcentajeDescuento'].setValue(productResult.porcentajeDescuento);

        productResult.productosIds.forEach((id: number) => {
          var prodById = this.lstProductos.find(e => e.item_id === id);

          if (prodById != undefined) {
            this.selectedItems.push(prodById);
          }
        });

        this.productForm.controls['selectedItemProducto'].setValue(this.selectedItems);
        const sdsdate: NgbDate = new NgbDate(2022, 10, 6);
        this.fromDate = sdsdate;

        const sdsadaddate: NgbDate = new NgbDate(2022, 10, 27);
        this.toDate = sdsadaddate;
      }, error: (err: HttpErrorResponse) => {
        this.toastr.error(err.error);
      }
    });
  }

  UpdateProduct(promocion: Promocion) {
    
    promocion.id = this.PromocionId;
    promocion.productosIds = [];
    const product_Master = this.productForm.value;

    product_Master.selectedItemProducto.forEach((estadoCombo: any) => {
      promocion.productosIds.push(estadoCombo.item_id);
    });

    this.PromocionService.updatePromocion(promocion).subscribe({
      next: () => {
        this.toastr.success('Promoción actualizado correctamente');
        this.router.navigateByUrl('/promocion');
      }, error: (err: HttpErrorResponse) => {
        this.toastr.error(err.error);
      }
    });
  }

  onItemSelectProducto(item: any) {
    this.procesarComboProducto();
  }


  onDropDownCloseEstado() {
    this.procesarComboProducto();
  }

  procesarComboProducto(): void {
    const productoArray: number[] = [];
    let estadoString = '';
    if (this.selectedItemProducto.length > 0) {
      this.selectedItemProducto.forEach(estadoCombo => {
        productoArray.push(estadoCombo);
      });
      estadoString = productoArray.join(',');
    }
    this.productosSelectedIds = estadoString;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    const fecIni = this.fromDate;
    const fecFin = this.toDate;

    if (fecIni != null && fecIni != undefined) {
      this.productForm.controls['fecInicio'].setValue(new Date(fecIni.year, fecIni.month - 1, fecIni.day));
    } else {
      this.productForm.controls['fecInicio'].setValue(new Date());
    }

    if (fecFin != null && fecFin != undefined) {
      this.productForm.controls['fecFin'].setValue(new Date(fecFin.year, fecFin.month - 1, fecFin.day));
    } else {
      this.productForm.controls['fecFin'].setValue(new Date());
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
      date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
      this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

}
