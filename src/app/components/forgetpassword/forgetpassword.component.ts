import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent {
  constructor(
    private _AuthService: AuthService,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}
  section1: boolean = true;
  section2: boolean = false;
  section3: boolean = false;
  msgErr: string = ``;
  isloading: boolean = false;
  // s1
  forgetForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  handleForget(): void {
    this.isloading = true;
    if (this.forgetForm.valid) {
      this._AuthService.forgotPassword(this.forgetForm.value).subscribe({
        next: (res: any) => {
          this.isloading = false;
          if (res.statusMsg == 'success') {
            this._ToastrService.success(res.message);
            this.openSection2();
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isloading = false;
          this.msgErr = err.error.message;
        },
      });
    } else {
      this.isloading = false;
      this.forgetForm.markAllAsTouched();
    }
  }

  // s2
  resetCodeForm: FormGroup = this._FormBuilder.group({
    resetCode: ['', [Validators.required, Validators.pattern(/^[0-9]{3,8}$/)]],
  });

  handleresetCode(): void {
    this.isloading = true;
    if (this.forgetForm.valid) {
      this._AuthService.verifyResetCode(this.resetCodeForm.value).subscribe({
        next: (res: any) => {
          this.isloading = false;
          if (res.status == 'Success') {
            this._ToastrService.success('you can set a new password');
            this.openSection3();
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isloading = false;
          this.msgErr = err.error.message;
        },
      });
    } else {
      this.isloading = false;
      this.forgetForm.markAllAsTouched();
    }
  }
  // s3
  resetPassForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z][\w]{6,9}$/)],
    ],
  });

  handleresetPass(): void {
    this.isloading = true;
    if (this.forgetForm.valid) {
      this._AuthService.resetPassword(this.resetPassForm.value).subscribe({
        next: (res: any) => {
          this.isloading = false;
          this._ToastrService.success('Password updated successfully');
          this._Router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          this.isloading = false;
          this.msgErr = err.error.message;
        },
      });
    } else {
      this.isloading = false;
      this.forgetForm.markAllAsTouched();
    }
  }

  openSection2(): void {
    this.section1 = false;
    this.section3 = false;
    this.section2 = true;
    this.msgErr = '';
  }
  openSection3(): void {
    this.section1 = false;
    this.section2 = false;
    this.section3 = true;
    this.msgErr = '';
  }
}
