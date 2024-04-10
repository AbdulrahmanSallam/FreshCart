import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  // prop
  isloading: boolean = false;
  msgErr: string = '';
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][\w]{6,9}$/),
      ]),
      rePassword: new FormControl(''),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: [this.checkRepass] } as FormControlOptions
  );

  checkRepass(form: FormGroup): void {
    const pass = form.get('password');
    const rePass = form.get('rePassword');
    if (rePass?.value == '') {
      rePass?.setErrors({ required: true });
    } else if (rePass?.value != pass?.value) {
      rePass?.setErrors({ misMatch: true });
    }
  }

  handleRegisteration(): void {
    this.isloading = true;
    if (this.registerForm.valid) {
      this._AuthService.signup(this.registerForm.value).subscribe({
        next: (res: any) => {
          if (res.message == 'success') {
            this.isloading = false;
            this._Router.navigate(['/login']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isloading = false;
          console.log('register', err);
          this.msgErr = err.error.message;
        },
      });
    } else {
      this.isloading = false;
      this.registerForm.markAllAsTouched();
    }
  }

  goLoginPage() {
    this._Router.navigate(['/login']);
  }
}
