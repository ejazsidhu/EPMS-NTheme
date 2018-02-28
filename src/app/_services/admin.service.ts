import { Injectable } from '@angular/core';
import {ConfigService} from './config.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class AdminService {

  constructor(public cs:ConfigService ,public http:Http) { }



  getAllUsers(){
    let headers = this.cs.headerWithToken();
    let str=this.cs.urlBuilder('/user');
     return this.http.get(str,{ headers: headers }).map((response: Response) => response.json());
  }

  getAllUsersRoles(){
    let headers = this.cs.headerWithToken();
    let str=this.cs.urlBuilder('/common/userroles');
     return this.http.get(str,{ headers: headers }).map((response: Response) => response.json());
  }

}
