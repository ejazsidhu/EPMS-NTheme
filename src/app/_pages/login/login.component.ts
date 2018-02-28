import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginModel } from '../../_models/login.interface';
import { LoginService } from '../../_services/login.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { ConfigService } from '../../_services/config.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from "app/validators";

import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css'],
  providers: [LoginService, ConfigService, EmailValidator, EqualPasswordsValidator],
})
export class LoginComponent {
 
  triggerk: boolean=false;
  @ViewChild('staticModal') public staticModal: ModalDirective;
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public login: LoginModel; // our model
  constructor(private _loginService: LoginService, private router: Router, private cs: ConfigService, fb: FormBuilder) {
    localStorage.clear();
   
   
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required])],
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];

  }
  myMessage = '';
  changeClass = false;
  tokenKey = 'x-auth-token';
  

  public onSubmit(values) {
    // console.log(this.form.value);

    if (this.form.valid) {
      let model= {
      email: this.form.value.email,
      password: this.form.value.password
    }
    console.log(model);
      this.changeClass = true;
      this._loginService.loginUser(model).subscribe(
        data => {

          this.changeClass = false;
                  let r = window.localStorage.getItem('UserID');
        
          if (data.success == false && data.data == null) {

            this.myMessage = data.message;
            this.triggerk = true;
            // this.staticModal.show();
          }

           if (data.success === false ){
            this.myMessage = data.message;
            this.triggerk = true;
          }
          else if (data.data.token) {
            
            let lsObject = {
              userID: data.data.userId,
              userMail: data.data.email,
              token: data.data.token,
              timeZone: data.data.timezone,
              fName: data.data.firstName,
              lName: data.data.lastName,
              organizationId:data.data.organizationId


            }

            window.localStorage.setItem("userObject", JSON.stringify(lsObject));
            var storedNames = JSON.parse(localStorage.getItem("userObject"));
         
            this.router.navigate(['dashboard']);
          }


          setTimeout(()=>{
            this.triggerk = false;
          },4000);

        },
        error => {
          console.log('error body');
          this.changeClass = false;
          console.log(error);
          this.triggerk = true;
          if (error.status === 0) {
            this.myMessage = 'Unable to connect to Server...!!';
            this.triggerk = true;
            // this.staticModal.show();
          }
          else if (error.status === 500) {

            this.myMessage = 'internal server erorr';
            this.triggerk = true;
            // this.staticModal.show();
          }
          else if (error.status === 401) {

            this.myMessage = error.statusText+ " Try to Access Account.Please check username and password";
            this.triggerk = true;
            // this.staticModal.show();
          }



        });

    }
  }

}
