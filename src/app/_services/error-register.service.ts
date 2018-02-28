
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ErrorModel } from '../_models/errors.model';
import 'rxjs/add/operator/map'
import { Subject } from "rxjs/Subject";

@Injectable()
export class ErrorRegisterService {

    constructor() {
        console.log("e-Service count :" + this.erList.length);
    }
    public em$ = new Subject();
    public popUp$ = new Subject();
   
    private erList = [];
    private popUpList = [];


    getPopUpMessages() {
        return this.popUpList;
    }
    UpdatePopUpMessageList(er) {
        this.popUp$.next(er);
        this.popUpList.push(er);
    }

    getError() {
        //return this.em$;
        return this.erList;
    }

    updateErrorList(er) {
        // console.log("error Service count :" + this.erList.length);
        this.em$.next(er);
        this.erList.push(er);

    }
    deleteNotifications() {
        while (this.erList.length) {
            this.erList.pop();
        }
          while (this.popUpList.length) {
            this.popUpList.pop();
        }
         
    }



}