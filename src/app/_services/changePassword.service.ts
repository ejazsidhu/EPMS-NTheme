import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {ConfigService} from './config.service';

import 'rxjs/add/operator/map'
@Injectable()
export class ChangePasswordService {

     constructor(private http: Http,private cs:ConfigService) { }

    changePassword(userId,_oldPass,_newPass,tName,tValue) {
        console.log("token test :   "+tValue);
        let body = JSON.stringify({oldPassword:_oldPass,newPassword:_newPass});
        // let body = {"oldPassword":_oldPass,"newPassword":_newPass};
        //body +=;
        // console.log('From service : '+body);
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('x-auth-token', tValue);
       
       //let options = new RequestOptions({ headers: headers });
        let _url='http://' + this.cs.ip + ':' + this.cs.port + '/user/'+userId+'/changepassword';
        console.log(_url);

       return this.http.post(_url, body, { headers: headers })
            .map(response => response.json());
            //JSON.parse(response.json())
    }
}
