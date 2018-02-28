import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../../validators';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ModalDirective } from 'ng2-bootstrap';
import { ChangePasswordService } from '../../../../_services/changePassword.service';
import { ErrorRegisterService } from '../../../../_services/error-register.service';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls:['./change-password.component.css'],
  providers: [EmailValidator, EqualPasswordsValidator, ChangePasswordService],

})
export class ChangePasswordComponent {
  triggerk: boolean = false;
  @ViewChild('staticModal') public staticModal: ModalDirective;
  storedNames = JSON.parse(localStorage.getItem("userObject"));

  myMessage = '';
  _oldPass = '';
  _newPass = '';
  token_name = 'x-auth-token';
  token_value: string;
  id = this.storedNames.userID;
  public form: FormGroup;
  public oldPassword: AbstractControl;
  public newPassword: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;

  public submitted: boolean = false;
  changeClass = false;
  constructor(fb: FormBuilder,
    private _changePassword: ChangePasswordService,
    private router: Router, private er: ErrorRegisterService) {
    this.validateLogin();
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
  validateLogin() {
    this.token_value = this.storedNames.token;
    //debugger;
    if (!this.token_value) {
      this.router.navigate(['login']);
    }
  }

  public onSubmit(values): void {
    this.token_value = this.storedNames.token;
    // this.token_value = window.localStorage.getItem(this.token_name);
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here

      console.log(values);

      this._oldPass = values.oldPassword;

      this._newPass = values.passwords.newPassword;


      this.changeClass = true;
      this._changePassword.changePassword(this.id, this._oldPass, this._newPass, this.token_name, this.token_value).subscribe(
        data => {
          
          this.form.reset();

          this.changeClass = false;
          // console.log('data body');
          // console.log(data);

          if (data.data === null && data.success === false) {

            this.myMessage = data.message;
            let m = moment().format('S SS SSS');
            this.er.UpdatePopUpMessageList("change password:" + this.myMessage + m);

            this.triggerk = true;
            // this.staticModal.show();


          }
          else {
            this.myMessage = data.message;
            let m = moment().format('S SS SSS');
            this.er.UpdatePopUpMessageList("change password:" + this.myMessage + m);

            // this.router.navigate(['dashboard']);

            this.triggerk = true;
            //  this.staticModal.show();
            //  this.router.navigate(['dashboard']);

          }//else if (data.success === true && data.message === "")
          //this.router.navigate(['dashboard']);
          // console.log(data.message);
          setTimeout(() => {
            this.triggerk = false;
          }, 10000);
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
    //if statement end here
  }


}