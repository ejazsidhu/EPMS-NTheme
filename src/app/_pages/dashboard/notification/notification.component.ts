import { Component, ViewChild } from '@angular/core';
import { ErrorRegisterService } from '../../../_services/error-register.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";
@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls:['./notification.component.css']



})
export class NotificationComponent {
  errorList = [];
  popUpList: any[];
  constructor(private er: ErrorRegisterService, private _router: Router) {
    this.validateLogin();
    // console.log("Notification body :  "+this.er.getError()) ;
    this.errorList = this.er.getError();
    this.popUpList = this.er.getPopUpMessages();
    // console.log("error count" + this.errorList.length);
    // console.log("pop up count" + this.popUpList.length);
  }

  token_value: any;
  @ViewChild('staticModal') public staticModal: ModalDirective;


  myMessage = 'Error List is Empty';
  popError(i) {
    this.errorList.splice(i, 1);
  }
  popList(i) {
    this.popUpList.splice(i, 1);
  }

  storedNames = JSON.parse(localStorage.getItem("userObject"));

  validateLogin() {
    this.token_value = this.storedNames.token;
    //debugger;
    if (!this.token_value) {
      this._router.navigate(['login']);
    }
  }



}
