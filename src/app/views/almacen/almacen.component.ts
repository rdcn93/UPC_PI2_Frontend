import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { RolService } from '../../services/rol.service';
import { Producto } from '../../models/producto';
import { Rol } from '../../models/rol';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.scss']
})
export class AlmacenComponent implements OnInit {

  constructor(
     private router: Router,
     private jwtHelper : JwtHelperService) { }

  ngOnInit() {
 
  }
  

  public logOut = () => {
    localStorage.removeItem("jwt");
    //this.router.navigate(["/"]);
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
