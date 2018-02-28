import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConfigService } from './config.service';
import 'rxjs/add/operator/map'
@Injectable()
export class RecoverPasswordService {

    constructor(private http: Http, private cs: ConfigService) { }



    recoverPassword(email) {
        let _url = 'http://' + this.cs.ip + ':' + this.cs.port + '/user/passwd/recover?email=' + email
        console.log(_url);

        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http
            .get(_url)
            .map(res => res.json());
    }


      changePassword(token_value,_oldPass,_newPass) {
        console.log("recover password token_value :   "+token_value);
        let body = JSON.stringify({oldPassword:_oldPass,newPassword:_newPass});
        // let body = {"oldPassword":_oldPass,"newPassword":_newPass};
        //body +=;
        console.log('From password recover service : '+body);
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        
       
       //let options = new RequestOptions({ headers: headers });
        let _url='http://' + this.cs.ip + ':' + this.cs.port + '/user/passwd/reset?token='+token_value;
        console.log(_url);

       return this.http.post(_url, body, { headers: headers })
            .map(response => response.json());
            //JSON.parse(response.json())
    }


}
