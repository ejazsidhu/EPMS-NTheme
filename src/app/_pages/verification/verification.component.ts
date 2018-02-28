import { Component, OnInit, Input ,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { VerificationService } from '../../_services/verification.service';
import { ModalDirective } from 'ng2-bootstrap';
import { LoginComponent } from '../login/login.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  
  providers: [VerificationService],

})
export class VerificationComponent implements OnInit {
  @ViewChild('staticModal') public staticModal:ModalDirective;
myMessage='';
  constructor(private activatedRoute: ActivatedRoute, private router: Router
    , private http: Http, private verificationService: VerificationService) { }
  ngOnInit() {
   
        this.activatedRoute.queryParams.subscribe((params: Params) => {
      let everification_id = params['everification_key'];
      console.log(everification_id);
      this.verificationService.verifiyUser(everification_id).subscribe(
        data => {
          console.log('from login data: '+data);
          if(data.status === true){
this.myMessage=data.message;
          this.staticModal.show();
        //   setTimeout(()=>{
        //     this.router.navigate(['login'],
        //   // this.myMessage="Congratulations you have successfull Verified"+"... you will be moved to login page in 5 seconds")
        // },9000);
          }

          else if(data.status === true){
            this.myMessage=data.message;
          this.staticModal.show();

          }
          

          
          //this.router.navigate(['login']);
          console.log(data);

        },
        error => {
          console.log(error);
          this.myMessage = ' , '+ error.status;
           this.staticModal.show();
           
            if (error.status === 0) {
            this.staticModal.show();
            this.myMessage = "Unable to access to Server";
          }
          if (error.status === 500) {
            let body = error.text();
            this.staticModal.show();
            let bodyObject = JSON.parse(error);
            this.myMessage = ' , '+ error.status;
            this.myMessage += ' , '+ error.statusText;
            this.myMessage += ' , '+ bodyObject.exception;
          }
        });
    });
  }

}
