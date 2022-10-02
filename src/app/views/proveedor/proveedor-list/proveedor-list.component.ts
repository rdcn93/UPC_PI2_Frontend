import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styleUrls: ['./proveedor-list.component.scss']
})
export class ProveedorListComponent implements OnInit {

  ProveedorList?: Observable<Proveedor[]>;
  ProveedorList1?: Observable<Proveedor[]>;
  ModalVisible = false;
  constructor(
    private proveedorService: ProveedorService,
    private jwtHelper : JwtHelperService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.ProveedorList1 = this.proveedorService.getProveedores();
    this.ProveedorList = this.ProveedorList1;
  }



  public DeleteProduct = (id: number) => {
    if (confirm('Quieres eliminar este Proveedor?')) {
      this.proveedorService.deleteProveedor(id)
    .subscribe({
      next: (_) => {
        this.toastr.success('Proveedor eliminado correctamente');
        this.getProductList();
    },
    error: (err: HttpErrorResponse) => {
      this.toastr.success('Ocurrió un error al eliminar el proveedor');
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
