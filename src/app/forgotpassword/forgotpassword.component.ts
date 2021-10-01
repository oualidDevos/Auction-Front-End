import { ForgotPasswordViewModel } from './../viewModels/ForgotPasswordViewModel';
import { AuthService } from './../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private fb:FormBuilder, private authService: AuthService) { }

  emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  dataRegistred = this.fb.group({
    email : [null,Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
    phoneNumber : [null,Validators.compose([Validators.required, Validators.pattern("^[0-9]{10}")])],
    identityCard: [null, Validators.compose([Validators.required, Validators.pattern('[A-Z]{1,3}[0-9]{4,6}$')])],
    password: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
    confirmPassword: [null, Validators.required],
    dateNaissance: [null, Validators.required],
  })

  ngOnInit(): void {

  }

  isSuccess?: boolean;

  async onSubmit(form:any){
    if( this.dataRegistred.valid ){
      const forgotviewModel: ForgotPasswordViewModel = {
        birthDate: this.DateNaissance.value,
        email: this.Email.value,
        confirmPassword: this.ConfirmPassword.value,
        identityCard: this.IdentityCard.value,
        password: this.Password.value,
        phoneNumber: Number(this.PhoneNumber.value)
      }

      await this.authService.forgotPassword(forgotviewModel).toPromise().
      then(
        m=> {
          this.isSuccess = true;
        },
        err=> {
          this.isSuccess = false;
          console.log(err);
        }
      );
    }else{
      this.dataRegistred.markAllAsTouched();
    }
  }

  get IdentityCard() {
    return this.dataRegistred.controls['identityCard']
  }
  get PhoneNumber() {
    return this.dataRegistred.controls['phoneNumber']
  }
  get Password() {
    return this.dataRegistred.controls['password']
  }
  get ConfirmPassword() {
    return this.dataRegistred.controls['confirmPassword']
  }
  get DateNaissance() {
    return this.dataRegistred.controls['dateNaissance']
  }
  get Email() {
    return this.dataRegistred.controls['email']
  }

}
