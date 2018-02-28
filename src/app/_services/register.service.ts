import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConfigService } from './config.service';


import { RegisterModel } from '../_models/register.model';

@Injectable()
export class RegisterService {
  
  constructor(private http: Http, private cs: ConfigService) { }
  public register(user) {
    let body = user;
    let headers =this.cs.headerWithoutToken();
    let _url = this.cs.urlBuilder(this.cs.signup);
    return this.http.post(_url, body, {headers:headers})
      .map(this.extractData);
  }
  private extractData(res: Response) {
    if (res.status == 200) {
      return JSON.parse('{ "message":"Successfully submited" }');
    } else {
      return res.json();
    }
  }



   _getTimezoneID(){

     let headers = this.cs.headerWithoutToken();
        let str=this.cs.urlBuilder('/common/timezone');
         return this.http.get(str,{ headers: headers }).map((response: Response) => response.json());
      }
}