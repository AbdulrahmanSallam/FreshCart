import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { UserInfo } from '../interfaces/user-info';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/auth/`;
  userInfo: UserInfo = {} as UserInfo;

  getUserInfo(): void {
    if (localStorage.getItem('token') != null) {
      const token: any = localStorage.getItem('token');
      this.userInfo = jwtDecode(token);
    }
  }
  signup(registerData: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `signup`, registerData);
  }
  signin(loginData: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `signin`, loginData);
  }
  signout(): void {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }
  forgotPassword(email: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `forgotPasswords`, email);
  }
  verifyResetCode(resetCode: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `verifyResetCode`, resetCode);
  }
  resetPassword(resetPassForm: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      resetPassForm
    );
  }
}
