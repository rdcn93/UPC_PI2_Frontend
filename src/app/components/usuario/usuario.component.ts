import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';
import { Usuario } from '../../models/usuario';
import { Rol } from '../../models/rol';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.sass']
})
export class UsuarioComponent implements OnInit {

  Roles?: Observable<Rol[]>;
  ProductList?: Observable<Usuario[]>;
  ProductList1?: Observable<Usuario[]>;
  productForm: any;
  massage = "";
  prodCategory = "";
  usuarioId = 0;
  nuevoUsuario: boolean = true;

  constructor(private formbulider: FormBuilder,
     private usuarioService: UsuarioService,
     private rolService: RolService,
     private router: Router,
     private jwtHelper : JwtHelperService,private toastr: ToastrService) { }

  ngOnInit() {
    this.prodCategory = "0";
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
    this.getProductList();
  }
  getRolesList() {
    this.Roles = this.rolService.getRoles();
  }
  getProductList() {
    this.ProductList1 = this.usuarioService.getUsuarios();
    this.ProductList = this.ProductList1;
  }
  PostProduct(product: Usuario) {
    const product_Master = this.productForm.value;
    
    this.usuarioService.createUsuario(product_Master).subscribe(
      () => {
        this.getProductList();
        this.productForm.reset();
        this.toastr.success('Data Saved Successfully');
      }
    );
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
    });
  }
  UpdateProduct(user: Usuario) {
    user.id = this.usuarioId;
    const product_Master = this.productForm.value;
    this.usuarioService.updateUsuario(user).subscribe(() => {
      this.toastr.success('Data Updated Successfully');
      this.productForm.reset();
      this.getProductList();
    });
  }

  DeleteProduct(id: number) {
    if (confirm('Do you want to delete this product?')) {
      this.usuarioService.deleteUsuario(id).subscribe(() => {
        this.toastr.success('Data Deleted Successfully');
        this.getProductList();
      });
    }
  }

  Clear(product: Usuario){
    this.nuevoUsuario = true;
    this.productForm.reset();
  }

  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
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
