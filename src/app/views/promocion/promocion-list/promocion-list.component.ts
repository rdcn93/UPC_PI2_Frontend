import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Promocion } from 'src/app/models/promocion';
import { PromocionService } from 'src/app/services/promocion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promocion-list',
  templateUrl: './promocion-list.component.html',
  styleUrls: ['./promocion-list.component.scss']
})
export class PromocionListComponent implements OnInit {

  PromocionList?: Observable<Promocion[]>;
  PromocionList1?: Observable<Promocion[]>;
  ModalVisible = false;
  successMessageSuccess = "";
  successMessageError = "";
  constructor(
    private PromocionService: PromocionService,
    private jwtHelper : JwtHelperService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.PromocionList1 = this.PromocionService.getPromociones();
    this.PromocionList = this.PromocionList1;
  }



  public DeleteProduct = (id: number) => {
    if (confirm('Quieres eliminar este Promoción?')) {
      this.PromocionService.deletePromocion(id)
      .subscribe({
        next: (_) => {
          this.successMessageSuccess = 'Promoción eliminada correctamente';
          this.toastr.success('Promoción eliminada correctamente');
          this.getProductList();
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.success('Ocurrió un error al eliminar la promoción');
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
