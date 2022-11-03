import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Proveedor } from 'src/app/models/proveedor';
import { Categoria } from 'src/app/models/categoria';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-producto-add-edit',
  templateUrl: './producto-add-edit.component.html',
  styleUrls: ['./producto-add-edit.component.scss']
})
export class ProductoAddEditComponent implements OnInit {

  productForm: any;
  nuevoProducto: boolean = true;
  almacenId = 0;
  titulo = "Registrar Producto";
  ListaProveedores?: Observable<Proveedor[]>;
  ListaCategorias?: Observable<Categoria[]>;
  submitted : boolean = false;
  successMessageSuccess = "";
  successMessageError = "";

  constructor(
    private formbulider: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private categoriaService: CategoriaService,
    private jwtHelper : JwtHelperService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.almacenId = this.route.snapshot.params['id'];

    if(this.almacenId != undefined && this.almacenId != 0){
      this.nuevoProducto = false;
      this.titulo = "Editar Producto";
      this.ProductDetailsToEdit(this.almacenId);
    }

    this.productForm = this.formbulider.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      idCategoria: ['', [Validators.required]],
      idProveedor: ['', [Validators.required]]
    });

    this.getProveedoresList();
    this.getCategoriasList();
  }

  getProveedoresList() {
    this.ListaProveedores = this.proveedorService.getProveedores();
  }

  getCategoriasList() {
    this.ListaCategorias = this.categoriaService.getCategorias();
  }

  PostProduct(product: Producto) {
    if (this.onValidate()) {
    }

    if(this.productForm.invalid){
      return;
    }

    const product_Master = this.productForm.value;
    
    this.productoService.createProducto(product_Master).subscribe({
      next: () => {
        this.router.navigate(['./','producto']);
        this.toastr.success('Producto registrado correctamente');
      }, error: (err: HttpErrorResponse) => {
        debugger;
        // this.toastr.error(err.error);
        this.successMessageError = err.error;
      }
    }); 
  }

  Clear(product: Producto){
    this.nuevoProducto = true;
    this.productForm.reset();
  }

  ProductDetailsToEdit(id: number) {
    this.nuevoProducto = false;
    this.productoService.getProductoById(id).subscribe(productResult => {      
      this.almacenId = productResult.id;
      this.productForm.controls['nombre'].setValue(productResult.nombre);     
      this.productForm.controls['descripcion'].setValue(productResult.descripcion);
      this.productForm.controls['precio'].setValue(productResult.precio);
      this.productForm.controls['idCategoria'].setValue(productResult.idCategoria);
      this.productForm.controls['idProveedor'].setValue(productResult.idProveedor);
    });
  }

  UpdateProduct(producto: Producto) {
    if (this.onValidate()) {
    }

    if(this.productForm.invalid){
      return;
    }

    producto.id = this.almacenId;
    const product_Master = this.productForm.value;
 

    this.productoService.updateProducto(producto).subscribe({
      next: () => {
        this.toastr.success('Producto actualizado correctamente');
        this.router.navigateByUrl('/producto');
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
