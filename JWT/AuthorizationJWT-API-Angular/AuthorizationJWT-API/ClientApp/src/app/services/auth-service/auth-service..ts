import { SignInModel } from './../../models/sign-in.model';
import { ApiResponse } from '../../models/api-response';
import { SignUpModel } from '../../models/sign-up.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  switchMenu = new EventEmitter<boolean>();

  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = "/api/Account";
  }

  signUp(signUpModel: SignUpModel): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${this.baseUrl}/signup`, signUpModel);
  }

  signIn(signInModel: SignInModel): Observable<ApiResponse> {
    const result = this.httpClient.post<ApiResponse>(`${this.baseUrl}/signin`, signInModel);
    return result;
  }

  signOut(): void {
    localStorage.removeItem("token");
    this.switchMenu.emit(false);
  }
}
