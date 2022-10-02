import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  constructor(
    private router: Router,
    private jwtHelper : JwtHelperService) { }

 ngOnInit() {

 }
 

 public logOut = () => {
   localStorage.removeItem("jwt");
   // this.router.navigate(["/"]);
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
