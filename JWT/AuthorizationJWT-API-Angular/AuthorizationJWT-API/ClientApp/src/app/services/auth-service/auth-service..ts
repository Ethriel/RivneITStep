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
    this.clearStorageSignOut();
    this.switchMenu.emit(false);
  }

  isSignedIn(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  isThereRole(): boolean {
    const role = this.getRole();
    return role !== null;
  }

  isAdmin(): boolean {
    const role = this.getRole();
    return role === 'Admin';
  }

  isUser(): boolean {
    const role = this.getRole();
    return role === 'User';
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token;
  }

  setToken(token: any): void {
    localStorage.setItem('token', token);
  }

  getRole(): string {
    const role = localStorage.getItem('userRole');
    return role;
  }

  setRole(role: any): void {
    localStorage.setItem('userRole', role);
  }

  private clearStorageSignOut(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
  }
}
