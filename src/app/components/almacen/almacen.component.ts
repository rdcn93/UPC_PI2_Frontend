import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { RolService } from '../../services/rol.service';
import { Producto } from '../../models/producto';
import { Rol } from '../../models/rol';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.sass']
})
export class AlmacenComponent implements OnInit {

  Roles?: Observable<Rol[]>;
  ProductList?: Observable<Producto[]>;
  ProductList1?: Observable<Producto[]>;
  productForm: any;
  massage = "";
  prodCategory = "";
  ProductoId = 0;
  nuevoProducto: boolean = true;

  constructor(private formbulider: FormBuilder,
     private productoService: ProductoService,
     private rolService: RolService,
     private router: Router,
     private jwtHelper : JwtHelperService,private toastr: ToastrService) { }

  ngOnInit() {
    this.prodCategory = "0";
    this.productForm = this.formbulider.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      idCategoria: ['', [Validators.required]],
      idProveedor: ['', [Validators.required]]
    });
    this.getRolesList();
    this.getProductList();
  }
  getRolesList() {
    this.Roles = this.rolService.getRoles();
  }
  getProductList() {
    this.ProductList1 = this.productoService.getProductos();
    this.ProductList = this.ProductList1;
  }
  PostProduct(product: Producto) {
    const product_Master = this.productForm.value;
    
    this.productoService.createProducto(product_Master).subscribe(
      () => {
        this.getProductList();
        this.productForm.reset();
        this.toastr.success('Data Saved Successfully');
      }
    );
  }
  ProductDetailsToEdit(id: number) {
    this.nuevoProducto = false;
    this.productoService.getProductoById(id).subscribe(productResult => {      
      this.ProductoId = productResult.id;
      this.productForm.controls['nombre'].setValue(productResult.nombre);
      this.productForm.controls['descripcion'].setValue(productResult.descripcion);
      this.productForm.controls['precio'].setValue(productResult.precio);
      this.productForm.controls['idCategoria'].setValue(productResult.idCategoria);
      this.productForm.controls['idProveedor'].setValue(productResult.idProveedor);    
    });
  }
  UpdateProduct(user: Producto) {
    user.id = this.ProductoId;
    const product_Master = this.productForm.value;
    this.productoService.updateProducto(user).subscribe(() => {
      this.toastr.success('Data Updated Successfully');
      this.productForm.reset();
      this.getProductList();
    });
  }

  DeleteProduct(id: number) {
    if (confirm('Do you want to delete this product?')) {
      this.productoService.deleteProducto(id).subscribe(() => {
        this.toastr.success('Data Deleted Successfully');
        this.getProductList();
      });
    }
  }

  Clear(product: Producto){
    this.nuevoProducto = true;
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
