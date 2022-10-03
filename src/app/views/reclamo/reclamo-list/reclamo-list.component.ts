import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Reclamo } from 'src/app/models/reclamo';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reclamo-list',
  templateUrl: './reclamo-list.component.html',
  styleUrls: ['./reclamo-list.component.scss']
})
export class ReclamoListComponent implements OnInit {

  ReclamoList?: Observable<Reclamo[]>;
  ReclamoList1?: Observable<Reclamo[]>;
  ModalVisible = false;
  constructor(
    private reclamoService: ReclamoService,
    private jwtHelper : JwtHelperService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.ReclamoList1 = this.reclamoService.getReclamos();
    this.ReclamoList = this.ReclamoList1;
  }



  public DeleteProduct = (id: number) => {
    if (confirm('Quieres eliminar este Reclamo?')) {
      this.reclamoService.deleteReclamo(id)
      .subscribe({
        next: (_) => {
          this.toastr.success('Reclamo eliminado correctamente');
          this.getProductList();
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.success('Ocurrió un error al eliminar el reclamo');
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
