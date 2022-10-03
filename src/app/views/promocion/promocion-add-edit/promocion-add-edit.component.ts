import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
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
  selectedItemProducto:  number[] = [];
  dropdownSettingsProducto: IDropdownSettings = {};
  productosSelectedIds = "";
  productosIds : number[] = [];

  constructor(
    private formbulider: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private PromocionService: PromocionService,
    private productoService: ProductoService,
    private jwtHelper: JwtHelperService,
    private toastr: ToastrService
  ) {
    
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

    this.selectedItemProducto = [20,2,];

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
      selectedItemProducto: [this.selectedItemProducto]
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
    if (this.productForm.invalid) {
      alert("Formulario incorrecto");
      return;
    }
    const product_Master = this.productForm.value;
    
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
          this.productosIds.push(id);        
        });
  
        this.selectedItemProducto = this.productosIds;
      }, error: (err: HttpErrorResponse) => {
        this.toastr.error(err.error);
      }
    });
  }

  UpdateProduct(Promocion: Promocion) {
    Promocion.id = this.PromocionId;
    Promocion.productosIds = [];
    const product_Master = this.productForm.value;
    
    product_Master.selectedItemProducto.forEach((estadoCombo: any) => {
      Promocion.productosIds.push(estadoCombo.item_id);        
    });

    this.PromocionService.updatePromocion(Promocion).subscribe({
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

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

}
