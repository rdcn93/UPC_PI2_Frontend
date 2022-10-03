import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  ProductList?: Observable<Usuario[]>;
  ProductList1?: Observable<Usuario[]>;
  ModalVisible = false;
  
  constructor(
    private usuarioService: UsuarioService,
    private jwtHelper : JwtHelperService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.getProductList();

    this.dtTrigger.next(0);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getProductList() {
    this.ProductList1 = this.usuarioService.getUsuarios();
    this.ProductList = this.ProductList1;
  }

  public DeleteProduct = (id: number) => {
    if (confirm('Quieres eliminar este Producto?')) {
      this.usuarioService.deleteUsuario(id)
      .subscribe({
        next: (_) => {
          this.toastr.success('Usuario eliminado correctamente');
          this.getProductList();
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.success('Ocurrió un error al eliminar el usuario');
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
