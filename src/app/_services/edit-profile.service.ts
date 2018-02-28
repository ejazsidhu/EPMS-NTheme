import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {ConfigService} from './config.service';

import 'rxjs/add/operator/map'
@Injectable()
export class EditProfileService {

     constructor(private http: Http,private cs:ConfigService) { }

    editProfile(userId,_fName,_lName,timezone,tValue) {
        
        let body = JSON.stringify({"userId":userId, "firstName":_fName,"lastName":_lName,"timezone":timezone});
        //body +=;
        console.log('From service : '+ body);
        
        let headers = this.cs.headerWithToken();
        let _url=this.cs.urlBuilder(this.cs.editProfile);
        console.log(_url);

       return this.http.put(_url, body, { headers: headers })
            .map(response => response.json());
            
    }
}
