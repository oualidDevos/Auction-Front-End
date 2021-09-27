import { RegisterViewModel } from '../viewModels/registerViewModel';
import { environment } from 'src/environments/environment';
import { LoginViewModel } from '../viewModels/loginViewModel';

import { Injectable } from '@angular/core';
import { Observable, ObservableInput, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

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


  isUserAccountActivated() {
    return sessionStorage.getItem('isActivated');
  }


  isUSerAutheniticated(){
    const token = sessionStorage.getItem("jwt");
    if( token ){
      let decoded: any = jwt_decode(token);
      sessionStorage.setItem("bidderId", decoded.bidderId);
      sessionStorage.setItem("userRole", decoded.userRole);
      sessionStorage.setItem("isActivated", decoded.isActivated);
      if( !this.jwtHelper.isTokenExpired(token) )
        return true;
      else{
        return false
      }
    }else{
      return false;
    }
  }
}

