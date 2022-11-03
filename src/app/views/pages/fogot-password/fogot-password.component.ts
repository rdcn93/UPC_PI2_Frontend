import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ForgotPassword } from '../../../models/forgot-password';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { environment } from 'src/environments/environment'; 

@Component({
  selector: 'app-fogot-password',
  templateUrl: './fogot-password.component.html',
  styleUrls: ['./fogot-password.component.scss']
})
export class FogotPasswordComponent implements OnInit {

  forgotPasswordForm: any;
  successMessage: string = "";
  errorMessage: string = "";
  showSuccess: boolean = false;
  showError: boolean = false;
  finalizado: boolean = false;

  constructor(private _authService: AuthService) { }
  
  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],)
    })
  }

  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.get(controlName).invalid && this.forgotPasswordForm.get(controlName).touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.get(controlName).hasError(errorName)
  }

  public forgotPassword = (forgotPasswordFormValue: any) => {
    this.showError = this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };

    const forgotPassDto: ForgotPassword = {
      email: forgotPass.email,
      clientURI: `${environment.webUrl}/michi/reset-password`
    }

    this._authService.forgotPassword(forgotPassDto)
    .subscribe({
      next: (_) => {
        this.finalizado = true;
        this.showSuccess = true;
        this.successMessage = 'Se envió un link de recuperación al correo indicado, por favor revisar su bandeja. Validar en Correo No Deseado también.'
    },
    error: (err: HttpErrorResponse) => {
      this.showError = true;
      // this.errorMessage = err.message;
      this.errorMessage = err.error;
    }})
  }


}
