import { UserData } from './../interfaces/user-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/users/`;
  constructor(private _HttpClient: HttpClient) {}
  getUserData(userId: string): Observable<any> {
    return this._HttpClient.get(this.baseUrl + userId);
  }
  editAccount(editAccountForm: any): Observable<any> {
    return this._HttpClient.put(this.baseUrl + `updateMe/`, editAccountForm);
  }
  newPassword(newPasswordForm: any): Observable<any> {
    return this._HttpClient.put(
      this.baseUrl + `changeMyPassword/`,
      newPasswordForm
    );
  }
}
