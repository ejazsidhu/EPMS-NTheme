import jwt_decode  from 'jwt-decode';
import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ErrorRegisterService } from '../../../_services/error-register.service';


import { ModalDirective } from 'ng2-bootstrap';
;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Component({
  selector: 'topBar',
  templateUrl: './topBar.component.html',
  styleUrls:['./topBar.component.css']
  
})
export class TopBarComponent {
  popUpList: any[];
  cahngeValue=false;
  @Output() value: EventEmitter<boolean>= new EventEmitter<boolean>();

    changeClass() {
      this.cahngeValue=!this.cahngeValue
        this.value.emit(this.cahngeValue);
            }

  

  errorList = [];
  errorCount(c) {
    if (c <= 0) {
      return false;
    }
    else
      return true;

  }
user_mail;
fName;lName;
admin_side=false;
storedNames = JSON.parse(localStorage.getItem("userObject"));
  constructor(private er: ErrorRegisterService, private router: Router) {
    console.log("top bar constructor");
    //console.log("Notification body :  "+this.er.getError()) ;
    this.errorList = this.er.getError();
   this.popUpList=this.er.getPopUpMessages();
    // console.log("error count" + this.errorList.length);
    // console.log("pop up count" + this.popUpList.length);

    // console.log(this.er.getError()) ;
    //this.errorList=this.er.getError();
    let storedNames = JSON.parse(localStorage.getItem("userObject"));
 
    let token=this.storedNames.token;
    let jwt=jwt_decode(token);
    // console.log(jwt);
for (var i = 0; i < jwt.roles.length; i++) {
  if(jwt.roles[i]=='ROLE_ADMIN'){
    this.admin_side=true;
    console.log("jjjj"+jwt.roles[i]);
        break;
  }
}

    if (!storedNames || storedNames == null) {
        this.validateLogin();
         }
    else{
       this.user_mail = storedNames.userMail;
       this.fName=storedNames.fName;
       this.lName=storedNames.lName;
    }
    // console.log(this.user_mail);
  

  }


  
  token_name = 'userObject';
  token_value: string;
  ngOnInt() {
    this.storedNames = JSON.parse(localStorage.getItem("userObject"));
  }
 validateLogin() {
    let storedNames = JSON.parse(localStorage.getItem("userObject"));
    
    this.token_value = storedNames;
  
    if (!this.token_value || this.token_value == null) {
      this.router.navigate(['login']);
    }
  }


}
