import { Component, OnInit, Input, ViewChild, trigger } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ModalDirective } from 'ng2-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ProductivitySetting } from '../../../_models/Productivity-settings.model';
import { SettingsService } from '../../../_services/setting.service';
import { TooltipModule } from "ng2-tooltip";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ErrorRegisterService } from "../../../_services/error-register.service";
import * as moment from 'moment';
@Component({
  selector: 'settings',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  providers: [SettingsService],

})
export class SettingComponent {
  token_value: any;
  changeClass: boolean;
  selectRadio: ProductivitySetting;

  @ViewChild('staticModal') public staticModal: ModalDirective;

  constructor(private service: SettingsService, private er: ErrorRegisterService, private _router: Router) {
    this.validateLogin();
    this.getUserSettingData();
  }
  validateLogin() {
    this.token_value = this.storedNames.token;
    //debugger;
    if (!this.token_value) {
      this._router.navigate(['login']);
    }
  }
  storedNames = JSON.parse(localStorage.getItem("userObject"));
  myMessage = 'Setting Page';

  id = this.storedNames.userID;
  triggerk = false;
  valueCheck = false;
  valueHolder = 0;

  public wCam = [
    { value: true, display: 'Enable' },
    { value: false, display: 'Disable' }
    ];
  public bCams = [
    { value: true, display: 'Enable' },
    { value: false, display: 'Disable' }
  ];
  public sShot = [
    { value: true, display: 'Enable' },
    { value: false, display: 'Disable' }
  ];
  public wBlur = [
    { value: true, display: 'Enable' },
    { value: false, display: 'Disable' }
  ];
  public timecInterval = [

    { value: 5, display: 5 },
    { value: 10, display: 10 },

  ];
  public activityCount = [

    { value: 5, display: 5 },
    { value: 10, display: 10 },

  ];

  onActivityChange1(event: Event) {
 
    event.preventDefault();
    this.selectRadio.activityCount = this.selectRadio.activityCount;


  }

  onActivityChange(event) {
    console.log('eent ' + event.defaultValue + " ;" + event.value)

  }
  ngOnInit() {
    this.selectRadio = {
      webcam: this.wCam[1].value,
      blurcam: this.bCams[1].value,
      screenShot: this.sShot[1].value,
      webcamBlured: this.wBlur[1].value,
      timeCardInterval: this.timecInterval[1].value,
      activityCount: this.activityCount[1].value,
    }
    
  }

  getUserSettingData() {
    this.token_value = this.storedNames.token;
    this.service.getUserSettings(this.id, this.token_value).subscribe(
      data => {

        this.changeClass = false;
       
        if (data.data === null && data.success === false) {

          this.myMessage = data.message;

        }
        else if (data.data) {
          this.selectRadio = {
            webcam: data.data.webcamEnabled,
            blurcam: data.data.screenshotBlured,
            screenShot: data.data.screenshotEnabled,
            webcamBlured: data.data.webcamBlured,
            timeCardInterval: data.data.timecardInterval,
            activityCount: data.data.activityCount,
          }
          let m = moment().format('S SS SSS');
         
        }
      

      },
      error => {
        //this.changeClass = false;
        console.log('error body');
        console.log(error);


        if (error.status === 0) {
          let m = moment().format('S SS SSS');
          this.myMessage = 'Unable to connect to Server...!!';
          this.er.updateErrorList("settings:  " + this.myMessage + m);

          this.staticModal.show();
        }
        if (error.status == 500) {
          let m = moment().format('S SS SSS');
          this.myMessage = error.statusText;
          this.staticModal.show();
          this.er.updateErrorList("settings:  " + this.myMessage + m);
        }
        // else{
        //    this.er.updateErrorList("settings:  " + this.myMessage);
        // }

      });

  }


  onSubmit(value: any): void {
    this.changeClass = true;
    let payload = {
      timecardInterval: value.timeCardInterval,
      activityCount: value.activityCount,
      webcamEnabled: value.webcam,
      webcamBlured: value.webcamBlured,
      screenshotEnabled: value.screenShot,
      screenshotBlured: value.blurcam
    };

    // console.log(payload);
    // console.log(JSON.stringify(payload));

    if (payload.activityCount === undefined || payload.timecardInterval === undefined || payload.webcamEnabled === undefined
      || payload.screenshotBlured === undefined || payload.screenshotEnabled === undefined) {
      this.myMessage = "Please fill all Value Before Submitting";
      // this.staticModal.show();
      this.triggerk = true;
      // console.log("payload is not empty" +JSON.stringify(payload));
    }
    if (payload.activityCount !== undefined && payload.timecardInterval !== undefined && payload.webcamEnabled !== undefined
      && payload.screenshotBlured !== undefined && payload.screenshotEnabled !== undefined) {
      this.myMessage = "Please filled ";
      this.triggerk = true;
      // this.staticModal.show();
      this.triggerk = false;
      // console.log("payload is filled" + JSON.stringify(payload));
      this.token_value = this.storedNames.token;
      this.service.changeSettings(this.id, this.token_value, payload).subscribe(
        data => {

          this.changeClass = false;
          // console.log('data body');
          // console.log(data);

          if (data.data === null && data.success === false) {

            this.myMessage = data.message;

            this.er.UpdatePopUpMessageList("settings:  " + this.myMessage);

            this.triggerk = true;
            // this.staticModal.show();


          } //else if (data.success === true && data.message === "")
          //this.router.navigate(['dashboard']);
          else {
            let m = moment().format('S SS SSS');
            this.myMessage = data.message;

            this.er.UpdatePopUpMessageList("settings:  " + this.myMessage + m);

            this.triggerk = true;

            // this.staticModal.show();

          }
          setTimeout(() => {
            this.triggerk = false;
          }, 10000);
          // console.log(data.message);
        },
        error => {
          //this.changeClass = false;
          console.log('error body');
          console.log(error);


          if (error.status === 0) {
            let m = moment().format('S SS SSS');
            this.myMessage = 'Unable to connect to Server...!!';
            this.er.updateErrorList("settings:  " + this.myMessage + m);

            this.staticModal.show();
          }
          if (error.status == 500) {
            let m = moment().format('S SS SSS');
            this.myMessage = error.statusText;
            this.er.updateErrorList("settings:  " + this.myMessage + m);
            this.staticModal.show();
          }
        });
    }

  }


}
