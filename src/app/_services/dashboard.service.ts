import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import { Register } from '../pages/register/register.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from './config.service';
import * as moment from 'moment';



@Injectable()

export class DashboardService {
  constructor(private _http: Http, private cs: ConfigService) { }
  // storedNames = JSON.parse(localStorage.getItem("userObject"));

  getUserInfo(id, key, getKey, date, filter) {
    let date1=moment.utc(date).format("YYYY-MM-DD");;
    // let timezone = this.storedNames.timeZone;

    let _url =this.cs.urlBuilder('/timecard/list/'+id+'?date='+date1+'&filter='+filter);
    // let _url =  this.cs.urlBuilder(this.cs.userInfo(id));
    console.log(_url);
    let body = { date: date, filter: filter };
    let jsonBody = JSON.stringify(body)
    console.log(jsonBody);
   
    
    let headers = this.cs.headerWithToken();
   
    // return this._http
    //   .post(_url, jsonBody, { headers: headers })
    //   .map(res => res.json());
    return this._http
      .get(_url, { headers: headers })
      .map(res => res.json());
  }

  changeWebCamSetting(w, b) {

    let body = { webCam: w, blurCam: b };
    let jsonBody = JSON.stringify(body)
    // let token_value = window.localStorage.getItem('x-auth-token');
    let _url = this.cs.urlBuilder('webCam/settings');
    console.log(_url);
    console.log(jsonBody);

    let headers = this.cs.headerWithToken();

    return this._http
      .post(_url, jsonBody, { headers: headers })
      .map(res => res.json());

  }
  deleteTimecard(id, token_value) {
    let _url = 'http://' + this.cs.ip + ':' + this.cs.port + '/timecard/';
    
    var array = [];
    
    if (id instanceof Array) {
      for(var index = 0 ; index < id.length-1; index++){
        _url+=id[index] + ",";
      }
      _url+=id[id.length-1];
    } else {
      _url+=id.toString();
    }
    
    let headers =this.cs.headerWithToken();
    
    return this._http
      .delete(_url, { headers: headers })
      .map(res => res.json());
  }


  disputeComment(id,dAction,dComment){
    let body = { action:dAction,comments:dComment };
    let jsonBody = JSON.stringify(body)
    // let token_value = window.localStorage.getItem('x-auth-token');
    let _url = this.cs.urlBuilder('/timecard/dispute/'+id);
    console.log(_url);
    console.log(jsonBody);

    let headers = this.cs.headerWithToken();

    return this._http
      .post(_url, jsonBody, { headers: headers })
      .map(res => res.json());

  }


}