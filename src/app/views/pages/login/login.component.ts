import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  invalidLogin?: boolean;
  successMessage: string = "";
  errorMessage: string = "";
  showSuccess: boolean = false;
  showError: boolean = false;

  url = environment.apiUrl + '/authentication/';

  constructor(private router: Router, private http: HttpClient,private jwtHelper : JwtHelperService) { }

  public login = (form: NgForm) => {
    
    const credentials = JSON.stringify(form.value);
    this.http.post(this.url +"login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8s"
      })
    }).subscribe(response => {
      
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      // this.toastr.success("Logged In successfully");
      this.router.navigate(["/usuario"]);
    }, err => {
      
      this.invalidLogin = true;
      this.showError = true;
      this.errorMessage = err.error;
    });
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
