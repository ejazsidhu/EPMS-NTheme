import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from './config.service';


@Injectable()
export class DashboardContentService {

  
    constructor(private _http: Http, private cs: ConfigService) { }

    // _url = 'http://' + this.cs.ip + ':' + this.cs.port + this.cs.dashboard;
    //app stats  by current date
    getApplicationStats(id, sDate) {
      
        let body = { interval: sDate};
        let jsonBody = JSON.stringify(body)
        let _url = this.cs.urlBuilder(this.cs.ApplicationStats(id));
                console.log(jsonBody);
       let headers = this.cs.headerWithToken();
        return this._http
            .post(_url, jsonBody, { headers: headers })
            .map(res => res.json());

    }

    getWorkingHours(id, sDate,) {
        
        let body = { interval: sDate};
        let jsonBody = JSON.stringify(body)
        console.log(jsonBody);
        
        let _url = this.cs.urlBuilder(this.cs.WorkingHoursStats(id));
        let headers = this.cs.headerWithToken();
        return this._http
            .post(_url, jsonBody, { headers: headers })
            .map(res => res.json());
    }
getWorkingHoursCustome(id, sDate) {
        
        let body = { interval: sDate};
        let jsonBody = JSON.stringify(body)
        console.log(jsonBody);
      
        let _url =this.cs.urlBuilder(this.cs.WorkingHoursStats(id));
        let headers = this.cs.headerWithToken();
        
        return this._http
            .post(_url, jsonBody, { headers: headers })
            .map(res => res.json());
        
    }





    getTotalWorkMintes(id, sDate) {
               let body = { interval: sDate};
        let jsonBody = JSON.stringify(body)
        let _url = this.cs.urlBuilder('/timesheet/user/'+id+'?interval='+sDate);
                console.log("working sumary:  "+jsonBody);
        let headers = this.cs.headerWithToken();
            //    return this._http
            // .post(_url, jsonBody, { headers: headers })
            // .map(res => res.json());
            return this._http
            .get(_url, { headers: headers })
            .map(res => res.json());

    }
}