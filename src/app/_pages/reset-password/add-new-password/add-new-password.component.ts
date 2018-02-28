import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import { VerificationService } from '../../_services/verification.service';
import { ModalDirective } from 'ng2-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../validators';
import { ErrorRegisterService } from "../../../_services/error-register.service";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { RecoverPasswordService } from "app/_services/recover-password.service";
import * as moment from 'moment';
@Component({
  selector: 'passwd/reset',
  templateUrl: './add-new-password.component.html',

  providers: [RecoverPasswordService],

})
export class AddNewPasswordComponent implements OnInit {
  triggerk: boolean=false;
  changeClass: boolean=false
  ;
  _newPass: any;
  _oldPass: string;
  token_value: any;
  public form: FormGroup;
  public oldPassword: AbstractControl;
  public newPassword: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;
  @ViewChild('staticModal') public staticModal: ModalDirective;
  myMessage = '';
  constructor(private activatedRoute: ActivatedRoute, private router: Router
    , private http: Http, fb: FormBuilder, private rps:RecoverPasswordService,private er:ErrorRegisterService) {

    this.form = fb.group({
      'oldPassword': ['admin', Validators.compose([Validators.required, Validators.minLength(4)])],
      'passwords': fb.group({
        'newPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('newPassword', 'repeatPassword') })
    });
    this.oldPassword = this.form.controls['oldPassword'];
    this.passwords = <FormGroup>this.form.controls['passwords'];
    this.newPassword = this.passwords.controls['newPassword'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }
  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.token_value = params['token'];
      console.log("value from server  " + this.token_value);
     
    });
  }

  public onSubmit(values): void {
    // this.token_value = this.storedNames.token;
    // this.token_value = window.localStorage.getItem(this.token_name);
    // this.submitted = true;
    if (this.form.valid) {
      // your code goes here

      console.log(values);

      this._oldPass = '';

      this._newPass = values.passwords.newPassword;

this.changeClass = true;

       this.rps.changePassword(this.token_value, this._oldPass, this._newPass,).subscribe(
        data => {

          this.changeClass = false;
          console.log('data body');
          console.log(data);

          if (data.data === null && data.success === false) {

            this.myMessage = data.message;
            let m = moment().format('S SS SSS');
            this.er.UpdatePopUpMessageList("change password:" + this.myMessage + m);

            this.triggerk = true;
            // this.staticModal.show();


          }
          else if(data.success === true) {
            this.myMessage = data.message +"\n"+"Shortly You will automaticaly navigagte to login..!";
           this.staticModal.show();

            

            // this.triggerk = true;
            //  this.staticModal.show();
            //  this.router.navigate(['login']);

          }//else if (data.success === true && data.message === "")
          //this.router.navigate(['dashboard']);
          // console.log(data.message);
          setTimeout(() => {
            // this.triggerk = false;
            this.router.navigate(['login']);
          }, 5000);
        },
        error => {
          this.changeClass = false;
          console.log(error);
          console.log(error.status);
          console.log(error.statusText);
          console.log('error body');
          if (error.status === 0) {
            let m = moment().format('S SS SSS');
            this.myMessage = 'Unable to connect to Server...!!';
            this.er.updateErrorList("Change Password: " + this.myMessage + m);


            this.staticModal.show();
          }
          if (error.status == 500) {
            let m = moment().format('S SS SSS');
            this.myMessage = error.statusText;
            this.er.updateErrorList("Change Password: " + this.myMessage + m);

            this.staticModal.show();
          }



        });

    }

  }
}
