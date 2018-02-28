import { ModalDirective } from 'ng2-bootstrap';


import { AdminService } from './../../../_services/admin.service';
import { Component, OnInit,ViewChild } from '@angular/core';

export class UserModel{
 
  constructor( public firstName:string,public lastName:string,public email:string,public status:string
  ,public userRole:{}) {
   
  }
}


@Component({
  selector: 'all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
providers:[AdminService]

})
export class AllUsersComponent implements OnInit {
  userId: any;
  myMessage: string;
  userModel: UserModel;
  showForm=false;
  allUser:any;
 userRoles:any;
 @ViewChild('staticModal2') public staticModal2: ModalDirective;
  
  constructor(public ads:AdminService) {
    this.userModel={
      firstName:'',
      lastName:'',
      email:'',
      userRole:{},
      status:'PENDING'
    }
    this.getAllUsers();
    this.getAllUsersRoles();
 
   }

  ngOnInit() {
  }

  deleteTimecard(user:any) {
    
    this.myMessage = "Do you want to delete this user "+ user.firstName+" "  + user.lastName +"?";
    this.staticModal2.show();
    this.userId=user.id;
    
  }
  OndeleteUser(){
    console.log(this.userId);

  }

  editForm(user){
    console.log("eidt Form data");
    console.log(user);

    if(user.roles[0]){
      this.userModel={
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        userRole:user.roles[0].code,
        status:user.status
      }
    }
    else{
      this.userModel={
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        userRole:'NA',
        status:user.status
      }

    }


  }
  onSubmit(m:any){
    console.log("on submit");
    console.log(m);
  }


  getAllUsers(){
    this.ads.getAllUsers().subscribe(data=>{
      // console.log(data);
      this.allUser=data.data;
      console.log("get user request");
      console.log(this.allUser);

    },error=>{

    });
  }


  getAllUsersRoles(){
    this.ads.getAllUsersRoles().subscribe(data=>{
      // console.log(data);
      this.userRoles=data.data;
      console.log("get user role request");
      console.log(this.userRoles);

    },error=>{

    });
  }

}
