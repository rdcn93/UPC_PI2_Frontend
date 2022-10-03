import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ForgotPassword } from '../models/forgot-password';
import { Observable } from 'rxjs/internal/Observable';
import { ResetPassword } from '../models/reset-password';

@Injectable()
export class AuthService implements CanActivate {

  private urlForgot = 'Authentication/ForgotPassword';
  private urlReset = 'Authentication/ResetPassword';
  
  constructor(private jwtHelper: JwtHelperService, private router: Router, private http: HttpClient) {
  }
  canActivate() {
    //get the jwt token which are present in the local storage
    const token = localStorage.getItem("jwt");

    //Check if the token is expired or not and if token is expired then redirect to login page and return false
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }

  // public forgotPassword = (route: string, body: ForgotPasswordDto) => {
  //   return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  // }

  public forgotPassword(forgot: ForgotPassword): Observable<ForgotPassword[]> {
    return this.http.post<ForgotPassword[]>(
      `${environment.apiUrl}/${this.urlForgot}`,
      forgot
    );
  }

  public resetPassword(forgot: ResetPassword): Observable<ResetPassword[]> {
    return this.http.post<ResetPassword[]>(
      `${environment.apiUrl}/${this.urlReset}`,
      forgot
    );
  }

}