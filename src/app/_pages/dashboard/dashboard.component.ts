import { ErrorRegisterService } from './../../_services/error-register.service';
import { Component, ViewChild, Input } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';
import {TopBarComponent} from './topBar/topBar.component';

import {ErrorModel} from '../../_models/errors.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:['./dashboard.component.css'],
  providers: [DashboardService],
 

})
export class DashboardComponent {
  popUpList: any[];
  errorList: any[];
  changeClass:boolean;

  constructor(private service: DashboardService, private router: Router,private er:ErrorRegisterService) { 
    this.validateLogin();
    this.storedNames = JSON.parse(localStorage.getItem("userObject"));
    this.errorList = this.er.getError();
    this.popUpList=this.er.getPopUpMessages();
  }
   
  
  changeClasss(n :boolean){
     console.log(n);
     this.changeClass=n;
    //  this.changeClass=!this.changeClass;

   }
   errorCount(c) {
    if (c <= 0) {
      return false;
    }
    else
      return true;

  }

    storedNames = JSON.parse(localStorage.getItem("userObject"));
  

  errorModel:ErrorModel[]=[];
  token_value:string;
  myMessage='';
  
  ngOnInit() {

    //this.validateLogin();
   
  }
  validateLogin() {
    
    this.token_value = this.storedNames;
  
    if (!this.token_value || this.token_value == null) {
      this.router.navigate(['login']);
    }
  }

}