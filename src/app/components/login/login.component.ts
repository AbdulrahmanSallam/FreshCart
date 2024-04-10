import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  // prop
  isloading: boolean = false;
  msgErr: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][\w]{6,9}$/),
    ]),
  });
  checkRepass(form: FormGroup): void {
    const pass = form.get('password');
    const rePass = form.get('rePassword');
    if (rePass?.value == '') {
      rePass?.setErrors({ required: true });
    } else if (rePass?.value != pass?.value) {
      rePass?.setErrors({ misMatch: true });
    }
  }

  handleLogin() {
    this.isloading = true;
    if (this.loginForm.valid) {
      this._AuthService.signin(this.loginForm.value).subscribe({
        next: (response: any) => {
          if (response.message == 'success') {
            this.isloading = false;
            // token
            localStorage.setItem('token', response.token);
            this._Router.navigate(['/home']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isloading = false;
          this.msgErr = err.error.message;
        },
      });
    } else {
      this.isloading = false;
      this.loginForm.markAllAsTouched();
      this.msgErr = 'Incorrect email or password';
    }
  }

  goRegister(): void {
    this._Router.navigate(['/register']);
  }
}
