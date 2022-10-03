import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

  ProductList?: Observable<Cliente[]>;
  ProductList1?: Observable<Cliente[]>;
  ModalVisible = false;
  constructor(
    private ClienteService: ClienteService,
    private jwtHelper : JwtHelperService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.ProductList1 = this.ClienteService.getClientes();
    this.ProductList = this.ProductList1;
  }



  public DeleteProduct = (id: number) => {
    if (confirm('Quieres eliminar este Cliente?')) {
      this.ClienteService.deleteCliente(id)
      .subscribe({
        next: (_) => {
          this.toastr.success('Cliente eliminado correctamente');
          this.getProductList();
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.success('Ocurrió un error al eliminar el cliente');
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
