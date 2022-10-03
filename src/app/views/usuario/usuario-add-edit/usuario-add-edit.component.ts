import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RolService } from 'src/app/services/rol.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuario-add-edit',
  templateUrl: './usuario-add-edit.component.html',
  styleUrls: ['./usuario-add-edit.component.scss']
})
export class UsuarioAddEditComponent implements OnInit {

  Roles?: Observable<Rol[]>;
  Roles2?: Rol[];
  productForm: any;
  nuevoUsuario: boolean = true;
  usuarioId = 0;
  rolId = 0;
  titulo = "Registrar Usuario";

  constructor(
    private formbulider: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private jwtHelper : JwtHelperService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.params['id'];

    if(this.usuarioId != undefined && this.usuarioId != 0){
      this.nuevoUsuario = false;
      this.titulo = "Editar Usuario";
      this.ProductDetailsToEdit(this.usuarioId);
    }

    this.productForm = this.formbulider.group({
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apePaterno: ['', [Validators.required]],
      apeMaterno: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      idRol: ['', [Validators.required]]
    });

    this.getRolesList();
    
    if(this.rolId != 0){
      this.productForm.controls['idRol'].setValue(this.rolId);  
    }
  }

  getRolesList() {
    this.Roles = this.rolService.getRoles();    
  }

  PostProduct(product: Usuario) {
    if(this.productForm.invalid){
      alert("Formulario incorrecto");
      // this.toastr.warning("Formulario incorrecto");
      return;
    }
    const user = this.productForm.value;
    
    // this.usuarioService.createUsuario(user).subscribe(
    //   () => {
    //     // this.getProductList();
    //     // this.productForm.reset();
    //     this.router.navigate(['./','usuario']);
    //     this.toastr.success('Usuario registrado correctamente');
    //   }
    // );

    this.usuarioService.createUsuario(user).subscribe({
      next: () => {
        this.router.navigate(['./','usuario']);
        this.toastr.success('Usuario registrado correctamente');
      }, error: (err: HttpErrorResponse) => {
        this.toastr.error(err.error);
      }
    }); 
  }

  Clear(product: Usuario){
    this.nuevoUsuario = true;
    this.productForm.reset();
  }

  ProductDetailsToEdit(id: number) {
    this.nuevoUsuario = false;
    this.usuarioService.getUsuarioById(id).subscribe(productResult => {      
      
      this.usuarioId = productResult.id;
      this.productForm.controls['usuario'].setValue(productResult.usuario);
      this.productForm.controls['clave'].setValue(productResult.clave);
      this.productForm.controls['nombre'].setValue(productResult.nombre);
      this.productForm.controls['apePaterno'].setValue(productResult.apePaterno);
      this.productForm.controls['apeMaterno'].setValue(productResult.apeMaterno);
      this.productForm.controls['correo'].setValue(productResult.correo);
      this.productForm.controls['telefono'].setValue(productResult.telefono);
      this.productForm.controls['idRol'].setValue(productResult.idRol);  
      
      this.rolId = productResult.idRol;
    });
  }

  UpdateProduct(user: Usuario) {
    user.id = this.usuarioId;
    const product_Master = this.productForm.value;
    // this.usuarioService.updateUsuario(user).subscribe(() => {
    //   this.toastr.success('Usuario actualizado correctamente');
    //   // this.productForm.reset();
      
    //   // this.router.navigate(['../'], { relativeTo: this.route });
    //   this.router.navigateByUrl('/usuario');
    // });

    this.usuarioService.updateUsuario(user).subscribe({
      next: () => {
        debugger;
        this.toastr.success('Usuario actualizado correctamente');
        this.router.navigateByUrl('/usuario');
      }, error: (err: HttpErrorResponse) => {
        this.toastr.error(err.error);
      }
    }); 
  }

  // public forgotPassword = (user: Usuario) => {
    
  //   this.usuarioService.updateUsuario(user)
  //   .subscribe({
  //     next: (_) => {
        
  //   },
  //   error: (err: HttpErrorResponse) => {
      
  //   }});
  // }

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