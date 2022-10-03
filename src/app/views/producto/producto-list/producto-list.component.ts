import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss']
})
export class ProductoListComponent implements OnInit {

  
  ListaProductos?: Observable<Producto[]>;
  ListaProductos1?: Observable<Producto[]>;
  ModalVisible = false;

  constructor(
    private productoService: ProductoService,
    private jwtHelper : JwtHelperService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProductosList();
  }

  getProductosList() {
    this.ListaProductos1 = this.productoService.getProductos();
    this.ListaProductos = this.ListaProductos1;
  }



  public DeleteProduct = (id: number) => {
    if (confirm('Quieres eliminar este Producto?')) {
      this.productoService.deleteProducto(id)
      .subscribe({
        next: (_) => {
          this.toastr.success('Producto eliminado correctamente');
          this.getProductosList();
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.success('Ocurrió un error al eliminar el producto');
        }})
    }    
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
