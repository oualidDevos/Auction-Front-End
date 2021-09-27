import { RegisterViewModel } from './viewModels/registerViewModel';
import { environment } from 'src/environments/environment';
import { LoginViewModel } from './viewModels/loginViewModel';

import { Injectable } from '@angular/core';
import { Observable, ObservableInput, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseUrlAuth = environment.authApiLogin;
  baseUrlAuthRegister = environment.authApiRegister;
  baseUrlAuthRegisterAdmin = environment.authApiRegisterAdmin;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  loginHandler(user: LoginViewModel): Observable<any>{
    return this.http.post<LoginViewModel>(this.baseUrlAuth, user, this.httpOptions);
  }


  registerHandler(user: RegisterViewModel): Observable<any>{
    return this.http.post<RegisterViewModel>(this.baseUrlAuthRegister, user, this.httpOptions);
  }
}
