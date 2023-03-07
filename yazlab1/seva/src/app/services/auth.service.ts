import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../models/auth-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //register api postman
  apiUrlRegister = 'http://localhost:3000/registers';
  //login api postman
  apiUrlLogin = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  //register
  register(registerModel: AuthModel): Observable<AuthModel> {
    return this.http.post<AuthModel>(this.apiUrlRegister, registerModel);
  }
  //login
  login(userModel: AuthModel): Observable<AuthModel> {
    return this.http.post<AuthModel>(this.apiUrlLogin, userModel);
  }

  //Token ,GUARD İÇİN
  isAuthhenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
