import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Rol } from 'src/app/models/rol';
import { Router, ActivatedRoute } from '@angular/router';
import { RolService } from 'src/app/services/rol.service';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlmacenService } from 'src/app/services/almacen.service';
import { Almacen } from 'src/app/models/almacen';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-almacen-list',
  templateUrl: './almacen-list.component.html',
  styleUrls: ['./almacen-list.component.scss']
})
export class AlmacenListComponent implements OnInit {
  
  ListaAlmacenes?: Observable<Almacen[]>;
  ListaAlmacenes1?: Observable<Almacen[]>;
  ModalVisible = false;
  successMessageSuccess = "";
  successMessageError = "";
  constructor(
    private almacenService: AlmacenService,
    private jwtHelper : JwtHelperService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAlmacenesList();
  }

  getAlmacenesList() {
    this.ListaAlmacenes1 = this.almacenService.getAlmacenes();
    this.ListaAlmacenes = this.ListaAlmacenes1;
  }



  public DeleteProduct = (id: number) => {
    if (confirm('Quieres eliminar este Almacén?')) {
      this.almacenService.deleteAlmacen(id)
    .subscribe({
      next: (_) => {
        this.successMessageSuccess = 'Almacén eliminado correctamente';
        this.toastr.success('Almacén eliminado correctamente');
        this.getAlmacenesList();
    },
    error: (err: HttpErrorResponse) => {
      this.toastr.success('Ocurrió un error al eliminar el almacén');
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
