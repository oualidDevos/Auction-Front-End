import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { scaleDownFromTop, moveFromBottom } from 'ngx-router-animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('scaleDownFromTop', [
      transition('trailer => register', useAnimation(scaleDownFromTop)),
      transition('trailer => login', useAnimation(moveFromBottom)),
    ]),
  ],
})
export class MainComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

currentUrl: any;

  ngOnInit(): void {
    this.currentUrl = this.router.url === '/';

    console.log(this.authService.isUserAdmin());


    if( this.authService.isUserAdmin() === true ){
      this.router.navigate(['/auctions']);
    }

  }

  public getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }

  isUserAccountActivated() {
    if( this.authService.isUserAccountActivated() === 'True'){
      return true;
    }else{
      return false;
    }
  }


  isUserAdmin(){
    return this.authService.isUserAdmin();
  }

  isUserAuthenticated(){
    return this.authService.isUSerAutheniticated();
  }

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
}
