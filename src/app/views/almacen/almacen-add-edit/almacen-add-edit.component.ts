import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RolService } from 'src/app/services/rol.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlmacenService } from 'src/app/services/almacen.service';
import { Almacen } from 'src/app/models/almacen';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-almacen-add-edit',
  templateUrl: './almacen-add-edit.component.html',
  styleUrls: ['./almacen-add-edit.component.scss']
})
export class AlmacenAddEditComponent implements OnInit {

  Roles?: Observable<Rol[]>;
  Roles2?: Rol[];
  productForm: any;
  nuevoAlmacen: boolean = true;
  almacenId = 0;
  titulo = "Registrar Almacen";
  submitted : boolean = false;
  successMessageSuccess = "";
  successMessageError = "";

  constructor(
    private formbulider: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private almacenService: AlmacenService,
    private rolService: RolService,
    private jwtHelper : JwtHelperService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.almacenId = this.route.snapshot.params['id'];

    if(this.almacenId != undefined && this.almacenId != 0){
      this.nuevoAlmacen = false;
      this.titulo = "Editar Almacen";
      this.ProductDetailsToEdit(this.almacenId);
    }

    this.productForm = this.formbulider.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
  }


  PostProduct(product: Almacen) {
    if (this.onValidate()) {
      // TODO: Submit form value
      // console.warn(this.productForm.value);
    }

    if(this.productForm.invalid){
      this.successMessageError = "Formulario incorrecto";
      // alert("Formulario incorrecto");
      // this.toastr.warning("Formulario incorrecto");
      return;
    }
    const product_Master = this.productForm.value;    
   
    this.almacenService.createAlmacen(product_Master).subscribe({
      next: () => {
        this.router.navigate(['./','almacen']);
        this.toastr.success('Almacén registrado correctamente');
      }, error: (err: HttpErrorResponse) => {
        this.toastr.error(err.error);
      }
    }); 
  }

  Clear(product: Almacen){
    this.nuevoAlmacen = true;
    this.productForm.reset();
  }

  ProductDetailsToEdit(id: number) {
    this.nuevoAlmacen = false;
    this.almacenService.getAlmacenById(id).subscribe(productResult => {      
      this.almacenId = productResult.id;
      this.productForm.controls['nombre'].setValue(productResult.nombre);     
      this.productForm.controls['descripcion'].setValue(productResult.descripcion);
      this.productForm.controls['direccion'].setValue(productResult.direccion);
      this.productForm.controls['telefono'].setValue(productResult.telefono);
    });
  }

  UpdateProduct(almacen: Almacen) {
    if (this.onValidate()) {
      // TODO: Submit form value
      // console.warn(this.productForm.value);
    }

    if(this.productForm.invalid){
      this.successMessageError = "Formulario incorrecto";
      // alert("Formulario incorrecto");
      // this.toastr.warning("Formulario incorrecto");
      return;
    }


    almacen.id = this.almacenId;
    const product_Master = this.productForm.value;
    
    
    this.almacenService.updateAlmacen(almacen).subscribe({
      next: () => {
        this.toastr.success('Almacén actualizado correctamente');
        this.router.navigateByUrl('/almacen');
      }, error: (err: HttpErrorResponse) => {
        this.toastr.error(err.error);
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
