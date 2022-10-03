import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { Rol } from '../../models/rol';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.sass']
})
export class ClienteComponent implements OnInit {

  Roles?: Observable<Rol[]>;
  ProductList?: Observable<Cliente[]>;
  ProductList1?: Observable<Cliente[]>;
  productForm: any;
  massage = "";
  prodCategory = "";
  ClienteId = 0;
  nuevoCliente: boolean = true;

  constructor(private formbulider: FormBuilder,
     private ClienteService: ClienteService,
     private router: Router,
     private jwtHelper : JwtHelperService,private toastr: ToastrService) { }

  ngOnInit() {
    this.prodCategory = "0";
    this.productForm = this.formbulider.group({
      nombre: ['', [Validators.required]],
      apePaterno: ['', [Validators.required]],
      apeMaterno: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      ruc: ['', [Validators.required]]
    });
    
    this.getProductList();
  }
  getProductList() {
    this.ProductList1 = this.ClienteService.getClientes();
    this.ProductList = this.ProductList1;
  }
  PostProduct(product: Cliente) {
    const product_Master = this.productForm.value;
    
    this.ClienteService.createCliente(product_Master).subscribe(
      () => {
        this.getProductList();
        this.productForm.reset();
        this.toastr.success('Data Saved Successfully');
      }
    );
  }
  ProductDetailsToEdit(id: number) {
    this.nuevoCliente = false;
    this.ClienteService.getClienteById(id).subscribe(productResult => {      
      this.ClienteId = productResult.id;
      this.productForm.controls['nombre'].setValue(productResult.nombre);
      this.productForm.controls['apePaterno'].setValue(productResult.apePaterno);
      this.productForm.controls['apeMaterno'].setValue(productResult.apeMaterno);
      this.productForm.controls['direccion'].setValue(productResult.direccion);
      this.productForm.controls['telefono'].setValue(productResult.telefono);    
      this.productForm.controls['ruc'].setValue(productResult.ruc);    
    });
  }
  UpdateProduct(user: Cliente) {
    user.id = this.ClienteId;
    const product_Master = this.productForm.value;
    this.ClienteService.updateCliente(user).subscribe(() => {
      this.toastr.success('Data Updated Successfully');
      this.productForm.reset();
      this.getProductList();
    });
  }

  DeleteProduct(id: number) {
    if (confirm('Do you want to delete this product?')) {
      this.ClienteService.deleteCliente(id).subscribe(() => {
        this.toastr.success('Data Deleted Successfully');
        this.getProductList();
      });
    }
  }

  Clear(product: Cliente){
    this.nuevoCliente = true;
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
