import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map'
@Injectable()
export class ConfigService {
   
    token_value='';
    storedNames = JSON.parse(localStorage.getItem("userObject"))
    //    token_value = this.storedNames.token;
     
    // if(storedNames = JSON.parse(localStorage.getItem("userObject")) === '' ){
    // //    this.token_value = this.storedNames.token;
    //     console.log(this.token_value);
    //     this.token_value='';
    // }
    // elseif(storedNames = JSON.parse(localStorage.getItem("userObject"))){
    //    this.token_value = storedNames.token;
    //     console.log(this.token_value);
    //     // this.token_value='';
    // }

    
    // public ip = '192.168.15.38';
    //   public ip = 'localhost';
    // public ip = 'DESKTOP-CTD9IK7';
    public ip='13.126.11.59';
    screenShot="SCREEN_SHOT_EVENT";
  webCam="WEB_CAM_EVENT"

    // public port = '8080/api';
public port = '8080/epms/api';
    public UId=786;

    public login = '/auth/login';
    public signup='/user/signup';
    public verification='/user/everification?everification_key=';
    public dashboard='/timecard/list';
   // public changePassword='/user/'+this.userId+'/changepassword';

   public editProfile ='/user/profile';
   Dahboard(Id,date){
       return '/timecard/list/'+Id +'/'+ date;
   }
    urlBuilder(api){
        return 'http://' + this.ip + ':' + this.port +api;
    }
    headerWithoutToken(){
        return  new Headers({ 'Content-Type': 'application/json' });
    }

    headerWithToken(){
          this.token_value = this.storedNames.token;
         let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('x-auth-token', this.token_value);
    return headers;
    }

    productivity(id){
        return '/productivity'+'/'+id
    }

userInfo(id){
    return '/timecard/list/' + id;
}

   public applicationStats='/dashboard/'+1+'/application/stats';
   public workingHoursStats='dashboard/'+1+'/workinghours/stats';

   public TotalWorkingMintes(userId){
       return '/dashboard/'+userId+'/summary';
   }
  
  public ApplicationStats(userId){

       return '/dashboard/'+userId+'/application/stats';
   }

   public WorkingHoursStats(userId){

       return '/dashboard/'+userId+'/workinghours/stats';
   }

    public ChangePassword(userId){
       return '/user/'+userId+'/changepassword'
   }

   public getOrganizationById(id){
       return '/org/'+id;

   }

   public  setUserId(id){
       this.UId=id;
    
   }
   public getUserId(){
       return this.UId;
   }
}
