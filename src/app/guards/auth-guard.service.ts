import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt"

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private jwtHelper: JwtHelperService) { }
  canActivate() {
    const token = sessionStorage.getItem("jwt");
    if( token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }else{
      this.router.navigate(["/trailer"])
      return false;
    }
  }
}
