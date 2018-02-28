import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import { Register } from '../pages/register/register.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from './config.service';



@Injectable()

export class SettingsService {
  constructor(private _http: Http, private cs: ConfigService) { }


  getUserSettings(id,auth_token_value) {

    let _url = 'http://' + this.cs.ip + ':' + this.cs.port + '/productivity'+'/'+id;
    console.log(_url);
    
    // let authToken = localStorage.getItem('auth_token')
    console.log(auth_token_value);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('x-auth-token', auth_token_value);
    //let options = new RequestOptions({ headers: headers });
    //console.log(headers);
    return this._http
      .get(_url, { headers: headers })
      .map(res => res.json());
  }

  changeSettings(id,t,payload){
    
        // let body={webCam:w,blurCam:b};
        // let jsonBody=JSON.stringify(body)
        let token_value = t;
        let _url = this.cs.urlBuilder(this.cs.productivity(id));
        console.log(_url );
        console.log("Service Body : "+ payload);

        
        let headers = this.cs.headerWithToken();
      
        return this._http
            .post(_url,payload, {headers:headers})
            .map(res => res.json());

  }


}