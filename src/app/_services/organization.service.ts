import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';

import 'rxjs/add/operator/map'

@Injectable()
export class OrganizationService {

  constructor(private http:Http,private cs:ConfigService) { }

  getOrganization(id){

   // let body = JSON.stringify(values);
        let headers = this.cs.headerWithToken();//new Headers({ 'Content-Type': 'application/json' });
        let str='/org/'+id;
        let _url=this.cs.urlBuilder(str);
        console.log(_url);

      return this.http.get(_url,{headers:headers}).map((response:Response) => response.json());

  }
  UpdateOrganization(id,values){

     let body = JSON.stringify(values);
     console.log(body)
         let headers = this.cs.headerWithToken();//new Headers({ 'Content-Type': 'application/json' });
         let str='/org/'+id;
         let _url=this.cs.urlBuilder(str);
         console.log(_url);
 
       return this.http.put(_url,body,{headers:headers}).map((response:Response) => response.json());
 
   }

  getOrganizationTeam(id){

    // let body = JSON.stringify(values);
         let headers = this.cs.headerWithToken();//new Headers({ 'Content-Type': 'application/json' });
         let str='/team/org/'+id;
         let _url=this.cs.urlBuilder(str);
         console.log(_url);
 
       return this.http.get(_url,{headers:headers}).map((response:Response) => response.json());
 
   }

   getTeamTimeSheet(id,startDate,endDate){

    // let body = JSON.stringify(values);
         let headers = this.cs.headerWithToken();//new Headers({ 'Content-Type': 'application/json' });
         let str='/timesheet/team/'+id+'?start_date='+startDate+'&'+'end_date='+endDate;
         let _url=this.cs.urlBuilder(str);
         console.log(_url);
 
       return this.http.get(_url,{headers:headers}).map((response:Response) => response.json());
 
   }

   
   getSpecificTimesheet(id, sDate) {
    let body = { interval: sDate};
let jsonBody = JSON.stringify(body)
let _url = this.cs.urlBuilder('/timesheet/team/'+id+'?interval='+sDate);

     console.log(_url);
let headers = this.cs.headerWithToken();

 return this.http
 .get(_url, { headers: headers })
 .map(res => res.json());

}

}
