import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {ConfigService} from './config.service';
import 'rxjs/add/operator/map'
@Injectable()
export class LoginService {

     constructor(private http: Http,private cs:ConfigService) { }

    loginUser(values) {
        let body = JSON.stringify(values);
        let headers = this.cs.headerWithoutToken();//new Headers({ 'Content-Type': 'application/json' });
        let _url=this.cs.urlBuilder(this.cs.login);
        console.log(_url);

        return this.http.post(_url, body, { headers: headers })
            .map(response => response.json());
            //JSON.parse(response.json())
    }
}
