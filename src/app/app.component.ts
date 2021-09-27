import { environment } from 'src/environments/environment';
import { Component, OnChanges, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
  title = 'EncahairPCP';

  toggled = false;
  isCollapsed = true;

  toggleMenu(){
    this.toggled = !this.toggled;
  }

  logOut(){
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("bidderId");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("userRole");
    this.router.navigate(["/login"])
  }

  ngOnChanges(): void{
  }

  constructor( private jwtHelper: JwtHelperService, private router: Router){ }
  ngOnInit(): void {
  }

  isUSerAutheniticated(){
    const token = sessionStorage.getItem("jwt");
    if( token ){
      let decoded: any = jwt_decode(token);
      sessionStorage.setItem("bidderId", decoded.bidderId);
      sessionStorage.setItem("userRole", decoded.userRole);
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
