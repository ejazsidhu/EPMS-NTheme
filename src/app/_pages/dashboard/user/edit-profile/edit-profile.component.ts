import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EditProfileService } from '../../../../_services/edit-profile.service';
import { ErrorRegisterService } from '../../../../_services/error-register.service';
import * as moment from 'moment';
import { ModalDirective } from 'ng2-bootstrap';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { RegisterService } from "app/_services/register.service";
@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls:['./edit-profile.component.css'],
  providers: [EditProfileService,RegisterService]

})
export class EditProfileComponent {
  timezoneData: any;
  triggerk: boolean = false;
  @ViewChild('staticModal') public staticModal: ModalDirective;
  storedNames = JSON.parse(localStorage.getItem("userObject"));

  myMessage = '';
  token_name = 'x-auth-token';
  token_value = this.storedNames.token;
  changeClass = false;
  id = this.storedNames.userID;
  ftName = this.storedNames.fName;
  ltName = this.storedNames.lName;
  email = this.storedNames.userMail
  tZone = this.storedNames.timeZone;
  timezoneId="(GMT-12:00) Etc/GMT+12";
  getNewVlues() {
    this.id = this.storedNames.userID;
    this.ftName = this.storedNames.fName;
    this.ltName = this.storedNames.lName;
    this.email = this.storedNames.userMail
    this.tZone = this.storedNames.timeZone;
   
  }
   getTimezoneID(){

    this._registerService._getTimezoneID().subscribe(
        data => {
          // this.changeClass = false;
          // console.log("timexone id  : "+data.data[0].timezoneId);
          this.timezoneData=data.data;
          this.myMessage=data.message;
          let m = moment().format('S SS SSS');

          // this.er.UpdatePopUpMessageList("change password:" + this.myMessage + m);

        },
        error => {
          this.changeClass = false;
          console.log(error);
          console.log(error.status);
          if (error.status === 0) {
            this.staticModal.show();
            this.myMessage = "Unable to access to Server";
          }
          if (error.status === 500) {
            console.log(error);

            let body = error.text();
            let bodyObject = JSON.parse(error);
            this.myMessage = ' , ' + error.status;
            this.myMessage += ' , ' + error.statusText;
            this.myMessage += ' , ' + bodyObject.exception;
            this.staticModal.show();
          }
        });

  }

  public form: FormGroup;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public timezone: AbstractControl;
  public userMail: AbstractControl;
  // public timezoneID:AbstractControl;

  public submitted: boolean = false;

  constructor(public _registerService: RegisterService,fb: FormBuilder, private router: Router, private _editProfile: EditProfileService, private er: ErrorRegisterService) {
    this.validateLogin();
    this.getNewVlues();
    this.getTimezoneID();

    this.form = fb.group({
      'userMail': [{ value: this.email, disabled: true }, Validators.compose([Validators.required, Validators.minLength(4)])],
      'firstName': [this.ftName, Validators.compose([Validators.required, Validators.minLength(4)])],
      'lastName': [this.ltName, Validators.compose([Validators.required, Validators.minLength(4)])],
      'timezone': [this.tZone, Validators.compose([Validators.required])],
      // 'timezoneID': ['(GMT-12:00) Etc/GMT+12', Validators.compose([Validators.required])],

    });
    this.userMail = this.form.controls['userMail'];
    this.firstName = this.form.controls['firstName'];
    this.lastName = this.form.controls['lastName'];
    this.timezone = this.form.controls['timezone'];
    // this.timezoneID = this.form.controls['timezoneID'];


  }
  navigateToDashboard(){
    this.router.navigate(['../dashboard']);
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
    this.submitted = true;
    // console.log(values);
    if (this.form.valid) {
      // your code goes here
      // this.changeClass = true;
      console.log(values);
      // //first name
      // console.log(values.firstName);
      // //lastName
      // console.log(values.lastName);
      // //timezone
      // console.log(values.timezone);

      this._editProfile.editProfile(this.id, values.firstName, values.lastName, values.timezone, this.token_value).subscribe(
        data => {

          this.changeClass = false;
          console.log('data body');
          console.log(data.data);
          if (data.data) {
            let lsObject = {
              userID: data.data.userId,
              userMail: this.email,
              token: this.token_value,
              timeZone: data.data.timezone,
              fName: data.data.firstName,
              lName: data.data.lastName

            }
            window.localStorage.setItem("userObject", JSON.stringify(lsObject));
            var storedNamess = JSON.parse(localStorage.getItem("userObject"));
            console.log(storedNamess);
            this.navigateToDashboard();
          }
          // console.log(data.success);
          if (data.success) {
            let m = moment().format('S SS SSS');
            this.myMessage = 'User Profile Successfully Updated';

            this.er.UpdatePopUpMessageList("edit profile:" + this.myMessage + m);

            this.triggerk = true;
            // this.staticModal.show();

            // this.router.navigate(['edit-profile']);
          }

          if (data.data === null && data.success === false) {
            let m = moment().format('S SS SSS');

            this.er.UpdatePopUpMessageList("edit profile:" + this.myMessage + m);

            this.triggerk = true;
            // this.staticModal.show();


          } //else if (data.success === true && data.message === "")
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
            this.er.updateErrorList("Edit Profile: " + this.myMessage + m);


            this.staticModal.show();
          }
          if (error.status == 500) {
            let m = moment().format('S SS SSS');

            this.myMessage = error.statusText;
            this.er.updateErrorList("Edit Profile: " + this.myMessage + m);

            this.staticModal.show();
          }



        });





    }
  }


}