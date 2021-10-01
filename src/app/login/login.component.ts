import { LoginViewModel } from './../viewModels/loginViewModel';
import { AuthService } from '../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if( this.authService.isUSerAutheniticated() === true){
      this.router.navigate(['main'])
    }
  }

  keyup(event: any, email: string, password: string){
    this.loginHandler(email, password);
  }

  isValidLogin: boolean | undefined;

  async loginHandler(email: string, password: string){
    const credentials: LoginViewModel = {
      password: password,
      userName: email
    }

    await this.authService.loginHandler(credentials).toPromise().then(
      m=> {
        const token = (<any>m).token;
        sessionStorage.setItem("jwt", token);
        this.isValidLogin = true;
        environment.isUserAuthenticated = true;
        this.router.navigate(["/"])
      },
      err => {
        this.isValidLogin = false;
        console.log(err);
      }
    );
  }
}
