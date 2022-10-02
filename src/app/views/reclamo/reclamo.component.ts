import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-reclamo',
  templateUrl: './reclamo.component.html',
  styleUrls: ['./reclamo.component.scss']
})
export class ReclamoComponent implements OnInit {

  constructor(
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
