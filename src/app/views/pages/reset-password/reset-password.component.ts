import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'src/components/validators/CustomValidators';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { PasswordConfirmationValidatorService } from 'src/app/shared/custom-validators/password-confirmation-validator.service';
import { ResetPassword } from 'src/app/models/reset-password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: any = FormGroup;
  showSuccess: boolean = false;
  showError: boolean = false;
  errorMessage: string = "";
  successMessage: string = "";

  private token: string = "";
  private email: string = "";

  constructor(private authService: AuthService, 
    private passConfValidator: PasswordConfirmationValidatorService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl(''),
      usuario: new FormControl(''),
      email: new FormControl('')
    });
    
    this.resetPasswordForm.get('confirmPassword').setValidators([Validators.required,
    this.passConfValidator.validateConfirmPassword(this.resetPasswordForm.get('password'))]);

    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];
    this.resetPasswordForm.get('usuario').value = this.route.snapshot.queryParams['usuario'];
    this.resetPasswordForm.get('email').value = this.route.snapshot.queryParams['email'];
  }

  public validateControl = (controlName: string) => {
    return this.resetPasswordForm.get(controlName).invalid && this.resetPasswordForm.get(controlName).touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.get(controlName).hasError(errorName)
  }

  public resetPassword = (resetPasswordFormValue : any) => {
    this.showError = this.showSuccess = false;
    const resetPass = { ...resetPasswordFormValue };

    const resetPassDto: ResetPassword = {
      password: resetPass.password,
      confirmPassword: resetPass.confirmPassword,
      token: this.token,
      email: this.email
    }

    this.authService.resetPassword(resetPassDto)
      .subscribe({
        next: (_) => {
          this.showSuccess = true;
          this.successMessage = "Se actualizó la contraseña correctamente";
        },
        error: (err: HttpErrorResponse) => {
          this.showError = true;
          this.errorMessage = err.message;
        }
      })
  }

}
