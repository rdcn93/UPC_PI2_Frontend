import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TipoDocumentoService } from 'src/app/services/tipoDocumento.service';
import { TipoDocumento } from 'src/app/models/tipoDocumento';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-proveedor-add-edit',
  templateUrl: './proveedor-add-edit.component.html',
  styleUrls: ['./proveedor-add-edit.component.scss']
})
export class ProveedorAddEditComponent implements OnInit {
  TipoDocumentos?: Observable<TipoDocumento[]>;
  TipoDocumentos2?: TipoDocumento[];
  productForm: any;
  nuevoProveedor: boolean = true;
  ProveedorId = 0;
  titulo = "Registrar Proveedor";
  tipoDocId = 0;
  submitted : boolean = false;
  successMessageSuccess = "";
  successMessageError = "";

  constructor(
    private formbulider: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ProveedorService: ProveedorService,
    private TipoDocumentoService: TipoDocumentoService,
    private jwtHelper : JwtHelperService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.ProveedorId = this.route.snapshot.params['id'];

    if(this.ProveedorId != undefined && this.ProveedorId != 0){
      this.nuevoProveedor = false;
      this.titulo = "Editar Proveedor";
      this.ProductDetailsToEdit(this.ProveedorId);
    }

    this.productForm = this.formbulider.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      idTipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
    });

    this.getTipoDocumentosList();

    this.productForm.controls['idTipoDocumento'].setValue(this.tipoDocId != 0 ? this.tipoDocId : 1);  
  }

  getTipoDocumentosList() {
    this.TipoDocumentos = this.TipoDocumentoService.getTipoDocumentos();    
  }

  PostProduct(product: Proveedor) {
    if (this.onValidate()) {
      // TODO: Submit form value
      // console.warn(this.productForm.value);
    }

    if(this.productForm.invalid){
      return;
    }
    const product_Master = this.productForm.value;
    
    this.ProveedorService.createProveedor(product_Master).subscribe({
      next: () => {
        this.router.navigate(['./','proveedor']);
        this.toastr.success('Proveedor registrado correctamente');
      }, error: (err: HttpErrorResponse) => {
        // this.toastr.error(err.error);
        this.successMessageError = err.error;
      }
    }); 
  }

  Clear(product: Proveedor){
    this.nuevoProveedor = true;
    this.productForm.reset();
  }

  ProductDetailsToEdit(id: number) {
    this.nuevoProveedor = false;
    this.ProveedorService.getProveedorById(id).subscribe(productResult => {      
      this.ProveedorId = productResult.id;
      this.productForm.controls['nombre'].setValue(productResult.nombre);     
      this.productForm.controls['direccion'].setValue(productResult.direccion);
      this.productForm.controls['descripcion'].setValue(productResult.descripcion);
      this.productForm.controls['telefono'].setValue(productResult.telefono);
      this.productForm.controls['idTipoDocumento'].setValue(productResult.idTipoDocumento);
      this.productForm.controls['numeroDocumento'].setValue(productResult.numeroDocumento);

      this.tipoDocId = productResult.idTipoDocumento;
    });
  }

  UpdateProduct(Proveedor: Proveedor) {
    if (this.onValidate()) {
      // TODO: Submit form value
      // console.warn(this.productForm.value);
    }

    if(this.productForm.invalid){
      return;
    }

    Proveedor.id = this.ProveedorId;
    const product_Master = this.productForm.value;
  

    this.ProveedorService.updateProveedor(Proveedor).subscribe({
      next: () => {
        this.toastr.success('Proveedor actualizado correctamente');
        this.router.navigateByUrl('/proveedor');
      }, error: (err: HttpErrorResponse) => {
        // this.toastr.error(err.error);
        this.successMessageError = err.error;
      }
    });
  }

  onValidate() {
    this.submitted = true;

    // stop here if form is invalid
    return this.productForm.status === 'VALID';
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
