import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {ConfigService} from './config.service';
@Injectable()
export class VerificationService{
  constructor(private http: Http ,private cs : ConfigService){}
  
    verifiyUser(id:string){
        let str:string = 'http://' + this.cs.ip + ':' + this.cs.port +this.cs.verification+ id;
         return this.http.get(str).map((response: Response) => response.json());
      }

}