import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  invalidLogin?: boolean;
  
  url = environment.apiUrl + '/authentication/';

  constructor(private router: Router, private http: HttpClient,private jwtHelper : JwtHelperService,
    private toastr: ToastrService) { }

  public login = (form: NgForm) => {
    const credentials = JSON.stringify(form.value);
    this.http.post(this.url +"login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.toastr.success("Logged In successfully");
      this.router.navigate(["/usuario"]);
    }, err => {
      this.invalidLogin = true;
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
