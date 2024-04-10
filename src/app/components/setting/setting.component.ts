import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SettingService } from 'src/app/core/services/setting.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserData } from 'src/app/core/interfaces/user-data';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent {
  constructor(
    private _SettingService: SettingService,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    this._AuthService.getUserInfo();
    this._SettingService.getUserData(this._AuthService.userInfo.id).subscribe({
      next: (res: any) => {
        this.userData = res.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  userData: UserData = {} as UserData;
  msgErr: string = ``;
  isLoading: boolean = false;
  section1: boolean = true;
  section2: boolean = false;
  // form 1
  editAccountForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });
  editAccount(): void {
    this.isLoading = true;
    if (this.editAccountForm.valid) {
      this._SettingService.editAccount(this.editAccountForm.value).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.message == 'success') {
            this._Router.navigate(['/login']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.msgErr = err.error.message;
          console.log(err);
        },
      });
    } else {
      this.isLoading = false;
      this.editAccountForm.markAllAsTouched();
    }
  }
  // form 2
  editPasswordForm: FormGroup = new FormGroup(
    {
      currentPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][\w]{6,9}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][\w]{6,9}$/),
      ]),
      rePassword: new FormControl(''),
    },
    { validators: [this.confirmRepassword] } as FormControlOptions
  );
  confirmRepassword(form: FormGroup): void {
    const pass = form.get('password');
    const rePass = form.get('rePassword');
    if (rePass?.value == '') {
      rePass?.setErrors({ required: true });
    } else if (rePass?.value != pass?.value) {
      rePass?.setErrors({ misMatch: true });
    }
  }
  editPassword(): void {
    this.isLoading = true;
    if (this.editPasswordForm.valid) {
      this._SettingService.newPassword(this.editPasswordForm.value).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.message == 'success') {
            this._Router.navigate(['/login']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.msgErr = err.error.message;
          console.log(err);
        },
      });
    } else {
      this.isLoading = false;
      this.editPasswordForm.markAllAsTouched();
    }
  }

  // control sections
  openSection1(): void {
    this.section2 = false;
    this.section1 = true;
    this.msgErr = '';
  }
  openSection2(): void {
    this.section2 = true;
    this.section1 = false;
    this.msgErr = '';
  }
}
