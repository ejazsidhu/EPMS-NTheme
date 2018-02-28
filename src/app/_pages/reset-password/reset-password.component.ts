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
import { RecoverPasswordService } from "app/_services/recover-password.service";
@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['reset-password.component.css'],
  providers: [RecoverPasswordService,LoginService, ConfigService, EmailValidator, EqualPasswordsValidator],
})
export class ResetPasswordComponent {
  triggerk: boolean=false;
  @ViewChild('staticModal') public staticModal: ModalDirective;
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public login: LoginModel; // our model
  constructor(private _recoverPassword:RecoverPasswordService, private router: Router, private cs: ConfigService, fb: FormBuilder) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate, Validators.minLength(4)])],
    
    });

    this.email = this.form.controls['email'];
   

  }
  myMessage = '';
  changeClass = false;
  tokenKey = 'x-auth-token';
  ngOnInit() {
    // this.login = {
    //   email: 'ejazsidhu@gmail.com',
    //   password: 'admin'
    // }
  }

  public onSubmit(values) {
    // console.log(this.form.value);

    if (this.form.valid) {
      let model= {
      email: this.form.value.email,
     
    }
    // console.log(model.email);
      this.changeClass = true;
      this._recoverPassword.recoverPassword(model.email).subscribe(
        data => {

          this.changeClass = false;
          // console.log('data body');
          // console.log(data);
          // console.log(data.data.token);
          console.log(data.data);
          console.log(data.message);
          // console.log(data.data.userId);

          // console.log("id from config service  : " + r);


          //  console.log(data.success);
          if (data.success === false && data.data === null) {

            this.myMessage = data.message;
            this.staticModal.show();
          }
          else if(data.success === true){
            this.myMessage = data.message;
             this.triggerk = true;
          }     



          //else if (data.success===true && data.message==="")
          //this.router.navigate(['dashboard']);
        },
        error => {
          console.log('error body');
          this.changeClass = false;
          console.log(error);

          if (error.status === 0) {
            this.myMessage = 'Unable to connect to Server...!!'
            this.staticModal.show();
          }
           if (error.status === 500) {
            this.myMessage = 'internal server erorr'
            this.staticModal.show();
          }

            if (error.status === 400) {
            this.myMessage = error.message;
            this.staticModal.show();
          }





        });

    }
  }

}
