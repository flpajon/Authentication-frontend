import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from './requests/loginRequest';
import { LoginResponse } from './responses/loginResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private authentication_endpoints = {
    SIGN_IN: '/authentication/signin',
    SIGN_UP: '/authentication/signup',
    REFRESH_TOKEN: '/refreshToken'
  };

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.base_url + this.authentication_endpoints.SIGN_IN, loginRequest);
  }
}
