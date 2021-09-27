import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { RegisterViewModel } from '../viewModels/registerViewModel';
import { ActivityService } from '../Services/activity.service';
import { ProductDetailsViewModel } from '../viewModels/ProductdetailsViewModel';
import { ActivitiesViewModel } from '../viewModels/ActivitiesViewModel';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent implements OnInit {

  constructor(private fb:FormBuilder, private authSevice: AuthService, private router: Router, private activityService: ActivityService) { }

  activitiesViewModel?: ActivitiesViewModel;

  async ngOnInit(): Promise<void> {
    await this.activityService.getActivities().toPromise().then(
      m=> {
        this.activitiesViewModel = m;
        // console.log(m);
      },
      err => {
        console.log(err);
      }
    )

    // console.log(this.activitiesViewModel);

  }


  emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  registeredSuccess = true;

  dataRegistred = this.fb.group({
    firstName : [null,Validators.required],
    lastName : [null,Validators.required],
    firstNameAr : [null,Validators.required],
    lastNameAr : [null,Validators.required],
    email : [null,Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
    phoneNumber : [null,Validators.compose([Validators.required, Validators.pattern("^[0-9]{10}")])],
    activityId : [null,Validators.compose([Validators.required])],
    address : [null,Validators.required],
    identityCard: [null, Validators.required],
    password: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
    confirmPassword: [null, Validators.required],
    dateNaissance: [null, Validators.required],
  })

  onSubmit(form:any){
    if( this.dataRegistred.valid ){
       const userToRegister: RegisterViewModel = {
         confirmPassword: this.Password.value,
         password: this.ConfirmPassword.value,
         email: this.Email.value,
         bidder: {
           activityId: Number(this.Activity.value),
           Address: this.Address.value,
           BirthDate: this.DateNaissance.value,
           FirstName: this.FirstName.value,
           FirstNameAr: this.FirstNameAr.value,
           LastName: this.LastName.value,
           LastNameAr: this.LastNameAr.value,
           IdentityCard: this.IdentityCard.value,
           phoneNumber: Number(this.PhoneNumber.value)
         }
       }

       this.authSevice.registerHandler(userToRegister).toPromise().then(
         m=> {
          //  console.log(m);
           this.registeredSuccess = true;
           this.router.navigate(["/login"])
         },
         err => {
           console.log(err);
           this.registeredSuccess = false;
         }
       )

    }else{
      this.dataRegistred.markAllAsTouched()
      this.registeredSuccess = false;
    }
  }





  get Email()
  {
    return this.dataRegistred.controls['email']
  }

  get DateNaissance()
  {
    return this.dataRegistred.controls['dateNaissance']
  }

  get Password()
  {
    return this.dataRegistred.controls['password']
  }

  get ConfirmPassword()
  {
    return this.dataRegistred.controls['confirmPassword']
  }

  get IdentityCard()
  {
    return this.dataRegistred.controls['identityCard']
  }

  get PhoneNumber()
  {
    return this.dataRegistred.controls['phoneNumber']
  }

  get Address()
  {
    return this.dataRegistred.controls['address']
  }


  get FirstName()
  {
    return this.dataRegistred.controls['firstName']
  }

  get LastName()
  {
    return this.dataRegistred.controls['lastName']
  }

  get FirstNameAr()
  {
    return this.dataRegistred.controls['firstNameAr']
  }

  get LastNameAr()
  {
    return this.dataRegistred.controls['lastNameAr']
  }

  get Activity()
  {
    return this.dataRegistred.controls['activityId']
  }

  // async loginHandler(email: string, password: string){
  //   const credentials: LoginViewModel = {
  //     password: password,
  //     userName: email
  //   }

  //   await this.authService.loginHandler(credentials).toPromise().then(
  //     m=> {
  //       const token = (<any>m).token;
  //       sessionStorage.setItem("jwt", token);
  //       this.isValidLogin = true;
  //       this.router.navigate(["/main"])


  //     },
  //     err => {
  //       this.isValidLogin = false;
  //       console.log(err);
  //     }
  //   );
  // }

}
