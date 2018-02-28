import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ModalDirective } from 'ng2-bootstrap';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ErrorRegisterService } from "app/_services/error-register.service";
@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',

})
export class LogoutComponent {
  @ViewChild('staticModal') public staticModal: ModalDirective;
  //myMessage='Logout Page';
  token_name = 'x-auth-token';
  token_value: string;
  myMessage = '';
  l: any[];
  p:any[];
  constructor(private router: Router, private er: ErrorRegisterService) {
this.er.deleteNotifications();
  
    
this.router.navigate(['login']);
    // this.token_value = window.localStorage.getItem(this.token_name);
  
    // if (!this.token_value) {
    //   this.router.navigate(['login']);
    // }
  }


}