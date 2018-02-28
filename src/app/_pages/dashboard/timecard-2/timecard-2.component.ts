import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewChild, SimpleChanges } from '@angular/core';
import { CarouselModule } from 'ng2-bootstrap/carousel';
import { DashboardService } from '../../../_services/dashboard.service';
import { IMyOptions } from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from '../../../_services/config.service';
import { sDate } from '../../../_models/sDate.model'
import * as moment from 'moment';
import { ErrorRegisterService } from '../../../_services/error-register.service';
import { ModalDirective } from "ng2-bootstrap";
import {IMyDpOptions} from 'mydatepicker';
export interface IMyDate {
  year: number;
  month: number;
  day: number;
}

declare var $;
export interface Model {
  date: any,
  filter: string
}
@Component({
  selector: 'timecard-2',
  templateUrl: './timecard-2.component.html',
  styleUrls: ['./timecard-2.component.css']
})

export class Timecard2Component {
  @ViewChild('staticModal') public staticModal: ModalDirective;
  @ViewChild('staticModal2') public staticModal2: ModalDirective;
  @ViewChild('staticModal3') public staticModal3: ModalDirective;
  storedNames = JSON.parse(localStorage.getItem("userObject"));
  changeLog: any;
  ActivityStrength: any = 0;
  imageIndex: any;
  selectedImageWeb: any;
  fullImagePath: string;
  date = new Date();
  imageEventList:any
  
  public form:FormGroup;
  public disputed:AbstractControl;
  public disputedReply:AbstractControl;
  public disputedSettleComment:AbstractControl;

  screenShot = this.cs.screenShot;
  webCam = this.cs.webCam;
  ip = this.cs.ip;
  port = this.cs.port;
  public myInterval: number = 1500;
  public slides: any[] = [];
  public activeSlideIndex: number;
  public noWrapSlides: boolean = false;
  public timecards:any[] = [];
  public imagesList = [];
  
  public timeStamp: Date[] = [];
  public timecardId = -1;
  dateSet: any;
  timecardCount=0;
  firstTimecard=0;
  lastTimecard=0;

  changeClass = true;
  token_name = 'x-auth-token';
  token_value: string;
  format = 'x';
  noTimeCard = false;
  selectedImage;
  selelctedOs;
  timecard: any[];
  userTimeZone;
  // fullPath = "./1.jpg";
  triggerk = false;
  dateNow;
  totalMClick = 0;
  totalKClick = 0; 
  myMessage: string;



  //next previous date
public myDatePickerOptions: IMyDpOptions = {
  // other options...
  dateFormat: 'dd.mm.yyyy',
  disableSince: {year: this.date.getFullYear(), month: this.date.getMonth()+1, day: this.date.getDate()+1}
};
todaydate=new Date()
// Initialized to specific date (09.10.2018).
public model = { date: { year: this.todaydate.getFullYear(), month: this.todaydate.getMonth()+1, day: this.todaydate.getDate() } , filter: "all"};

  public constructor(private er: ErrorRegisterService,private fb:FormBuilder,

     private _service: DashboardService, private _router: Router,
      private cs: ConfigService) {
    this.form=fb.group({
      'disputed':['',Validators.compose([Validators.minLength(4)])],
      'disputedReply':['',],
      'disputedSettleComment':['']
    });

    this.disputed=this.form.controls["disputed"];
    this.disputedReply=this.form.controls["disputedReply"];
    this.disputedSettleComment=this.form.controls["disputedSettleComment"];  


 
  }


  onDisputeFormSubmit(id,form,action:string){

    let comment='';

    if(form.disputed!=''){
      comment=form.disputed;

    }
    else if(form.disputedReply!=''){
      comment=form.disputedReply;

    }
    else if(form.disputedSettleComment!='')
    {
      comment=form.disputedSettleComment;

    }

    console.log("disputed form")
    console.log(id)
    console.log(form)
    console.log(action);
    this._service.disputeComment(id,action,comment).subscribe(data=>{
      console.log(data)
      this.form.reset();
    },
    error=>{
      this.form.reset();
    });
    

  }

previousData(d:any){

let year,days,month;
if(d.date.month==1 && d.date.day==1){
  year=d.date.year-1;
}else{
  year=d.date.year;
}
year=d.date.year;
if(d.date.day==1){
  month=d.date.month-1;
 
}else{
month=d.date.month;
}
if(d.date.day==1){
  let monthOfDay=new Date(d.date.year,d.date.month-1,0).getDate();
  // console.log("custome"+monthOfDay);
  days=monthOfDay;

}
else{
  days=d.date.day-1;
}


this.model={ date: { year:year , month:month , day:days} ,filter:d.filter};
this.onSubmit(this.model);
// console.log(this.model)
}


nextData(d:any){

console.log(d);

let monthOfDay=new Date(d.date.year,d.date.month,0).getDate();
let year,days,month;
if(d.date.month==12 && d.date.day==monthOfDay){
  year=d.date.year+1;
}else{
  year=d.date.year;
}
year=d.date.year;
if(d.date.day==monthOfDay){
  month=d.date.month+1;
 
}else{
month=d.date.month;
}
if(d.date.day == monthOfDay){
  // let monthOfDay=new Date(d.date.year,d.date.month-1,0).getDate();
  // console.log("custome"+monthOfDay);
  days=1;
  // days=d.date.day-1;
}
else{
  days=d.date.day+1;
}

this.model={ date: { year:year , month:month , day:days} ,filter:d.filter};

this.onSubmit(this.model);

// days=testDate.subtract(1,'days');
// this.model={ date: { year:year , month:month , day:days} };
// console.log(this.model)

}
//next previous date




  ngOnInit() {
    let d = new Date();
    // console.log(d.getFullYear());
    // this.model = { date: { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() } }
    // console.log(this.model);
    this.validateLogin();


    let dd = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    this.dateSet = dd;
    let ttt = d.getMonth() + 1 + '' + '_' + d.getDate() + '_' + d.getFullYear();
    // let ssDate = moment(d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()).add(1, 'month').format(this.format);
    // let sDate = moment(d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()).add(1, 'month');
    let id = this.storedNames.userID;
    this.dateNow = ttt;
    this.userTimeZone = this.storedNames.timeZone;
    this.getTimecardList(id, dd, "all");

  }
  public timedurration(tm, min, max) {
    if (tm >= min && tm <= max)
      return true;
    else
      return false;

  }
 
  // public myDatePickerOptions: IMyOptions2 = {
  //   // other options...


  //   dateFormat: 'dd.mm.yyyy',
  //   showTodayBtn: true,
  //   showClearDateBtn: false,
  //   disableSince: { year: 0o0, month: 0, day: 0 },
  //   editableDateField: false,
  //   inline: false,
  //   indicateInvalidDate: true,
  //   showInputField: true,
  //   // todayBtnTxt: 'Today',


  // };
  // bulkDel = false;
  // today = new Date();
  // // this.today.getMonth() + 1 + '.' + this.today.getDate() + '.' + this.today.getFullYear();

  // model: Model = {
  //   mydate: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() }
  //   , filter: "all"
  // };



  actStrength(n: any) {
    // console.log(n)
    return n.totalKeypressCount + n.totalMouseCount;
  }
  deleteTimecard(id) {
    // console.log("time card id: " + id);
    this.myMessage = "Do you want to delete this timecard?";
    this.staticModal2.show();
    this.timecardId = id;
  }



  validateLogin() {
    this.token_value = this.storedNames.token;
    //debugger;
    if (!this.token_value) {
      this._router.navigate(['login']);
    }
  }
  onSubmit(value) {
    // console.log("submit value");
    // console.log(value);
    // let dateIs: any = '';
    this.changeClass = true;
    this.timecards = [];
    // if (value.mydate.date) {
    //   console.log("date 2");
    //   dateIs = value.mydate.date.year + "-" + value.mydate.date.month + "-" + value.mydate.date.day;

    //   console.log(value.mydate.date);
    // }
    // else if (value.mydate) {
    //   console.log("date 1");
    //   dateIs = value.mydate.year + "-" + value.mydate.month + "-" + value.mydate.day;

    //   console.log(value.mydate);
    // }
    let obj = { date: value.date.year+'-'+value.date.month+'-'+value.date.day, filter: value.filter }
    // let stringifyObj = JSON.stringify(obj);
    // console.log("stringify" + stringifyObj);
  
    this.validateLogin();
    // this.dateNow = tt;
    let id = this.storedNames.userID;
    this.getTimecardList(id,obj.date,obj.filter);
  }

  returnOnlyActivityEvent(obj) {
    let newObj = [];
    for (let r of obj) {
      if (r.eventType === 'ACTIVITY_EVENT')
        newObj.push(r);
    }
    return newObj;
  }



  getTimecardList(id, date, filter) {
    this.token_value = this.storedNames.token;
    this._service.getUserInfo(id, 'x-auth-token', this.token_value, date, filter).subscribe(
      data => {
        this.changeClass = false
        this.noTimeCard = false;
        this.timecards = data.data;
        if (this.timecards.length == 0) {
          this.noTimeCard = true;
        }
        // console.log('total timecards: ' + this.timecards.length);
        // for(var z=0; z < this.timecards.length; z++)
        // {
        //   console.log('ae:  ' + z +' '+ this.timecards[z].activityEvents)
        // }

        // //TODO remove duplicate timecards logic
        let res = this.removeDObject(data.data);
        // console.log(res.length);
        for (let timecardIndex = 0; timecardIndex < res.length; timecardIndex++) {
          let imageEvents = res[timecardIndex].imageEvents;
          let finalImageEvents = new Array<any>(2)
          let counterWebcam = 0;
          let counterScreenshot = 0;
          for (let imageEventIndex = 0; imageEventIndex < imageEvents.length; imageEventIndex++) {
            if (imageEvents[imageEventIndex].eventType == 'WEB_CAM_EVENT' && counterWebcam == 0) {
              finalImageEvents[0]=(imageEvents[imageEventIndex]);
              counterWebcam = 1;
            }
           


            if (imageEvents[imageEventIndex].eventType == 'SCREEN_SHOT_EVENT' && counterScreenshot == 0) {
              finalImageEvents[1]=(imageEvents[imageEventIndex]);
              counterScreenshot = 1;
            }
           
          }

          res[timecardIndex].imageEvents = finalImageEvents;
        }
        this.timecards = res;
        // console.log('array length')
        this.timecardCount=this.timecards.length;
      //  console.log(this.timecards)
       this.firstTimecard=this.timecards[0];
       this.lastTimecard=this.timecards[this.timecards.length-1];
      //  console.log(this.timecards[0])
      //  console.log(this.timecards[this.timecards.length-1])
        

      },
      error => {
        console.log("time card error :" + error);
        if (error.status === 0) {
          let m = moment().format('S SS SSS');
          this.myMessage = 'Unable to connect to Server...!!';
          this.er.updateErrorList("Time Card: " + this.myMessage + m);
          this.staticModal.show();
        }
        else if (error.status == 500) {
          let m = moment().format('S SS SSS');
          this.myMessage = error.statusText;
          this.er.updateErrorList("Time Card: " + this.myMessage + m);
          this.staticModal.show();
        }
        else {
          let m = moment().format('S SS SSS');
          this.er.updateErrorList("time card url :null " + m);
          this.staticModal.show();
        }

      });
  }
  tm;
  setSelectedImage(image) {
    console.log(image)
    this.selectedImage = image;
    //this.imageIndex = i;
  }
  public removeDObject(things) {
    var obj = {};

    for (var i = 0, len = things.length; i < len; i++)
      obj[things[i]['id']] = things[i];

    things = new Array();
    for (var key in obj)
      things.push(obj[key]);
    return things;
  }
  setSelectedImageWeb(image) {
    this.selectedImageWeb = image;
  }


  navigate(forward) {
    var index = this.timecards.indexOf(this.selectedImage) + (forward ? 1 : -1);
    if (index >= 0 && index < this.timecards.length) {
      this.selectedImage = this.timecards[index];
    }

    
  }
 


  checkBox = []
  checkBoxCount = false;

  onchecked(e, n) {
    // console.log(e.target.checked);
    // console.log(n);
    // console.log(this.asdf);

    if (e.target.checked) {
      this.checkBox.push(n);
      this.checkBoxCount = true;
    }
    if (e.target.checked == false) {
      for (var t = 0; t < this.checkBox.length; t++) {
        if (this.checkBox[t] === n) {
          // this.timecards.splice(t,1);

          this.checkBox.splice(t, 1);

        }

      }
      // this.checkBox.pop();
      if (this.checkBox.length == 0) {
        this.checkBoxCount = false;
      }


    }

    // console.log(this.checkBox);

  }
  deleteBulkTimecard() {
    // console.log("time card id: " + id);
    this.myMessage = "Do you want to delete this timecard(s)?";
    this.staticModal3.show();
    // this.timecardId = id;
  }
  DeleteAllTimecard() {

    if (this.checkBox.length > 0) {
      //       for (var i = 0; i < this.checkBox.length; i++) {
      // this.checkBox.splice(i, 1);
      //       }
      this.OndeleteTimecardBulk(this.checkBox);

      for (var k = 0; k <this.checkBox.length; k++) {
        for (var i = 0; i <  this.timecards.length; i++) {
          if (this.timecards[i].id == this.checkBox[k]) {
            debugger;
            this.checkBox.splice(k, 1);
            this.timecards.splice(k, 1);
            break;

          }


        }

      }


    }
  }
  OndeleteTimecard() {

    this.token_value = this.storedNames.token;
    this._service.deleteTimecard(this.timecardId, this.token_value).subscribe(
      data => {
        let id = this.storedNames.userID;

        for (var i = 0; i < this.timecards.length; i++)

          if (this.timecards[i].id === this.timecardId) {
            this.timecards.splice(i, 1);
            break;
          }


        // console.log(data);
        this.myMessage = data.message;
        this.triggerk = true;
        // this.staticModal.show();
        setTimeout(() => {
          this.triggerk = false;
        }, 10000);


      },
      error => {
        console.log("time card error :" + error);
        if (error.status === 0) {
          let m = moment().format('S SS SSS');
          this.myMessage = 'Unable to connect to Server...!!';
          this.er.updateErrorList("Time Card: Delete " + this.myMessage + m);
          this.staticModal.show();
        }
        else if (error.status == 500) {
          let m = moment().format('S SS SSS');
          this.myMessage = error.statusText;
          this.er.updateErrorList("Time Card:Delete " + this.myMessage + m);
          this.staticModal.show();
        }
        else {
          let m = moment().format('S SS SSS');
          this.er.updateErrorList("time card url : Delete null" + m);
          this.staticModal.show();
        }

      });


  }
  OndeleteTimecardBulk(checkBox) {

    this.token_value = this.storedNames.token;

    if (this.checkBox.length > 0) {
      this._service.deleteTimecard(checkBox, this.token_value).subscribe(
        data => {
          //TODO: ejaz add the logic to hide those timecards

          // console.log(data);

          //            for (var i = 0; i < this.checkBox.length;  i++) {
          //              if(this.checkBox.length>0){
          // for (var k = 0; k < this.timecards.length; k++) {
          //               if (this.timecards[k].id === this.checkBox[i]) {
          //                 debugger;
          //                 this.checkBox.splice(i, 1);
          //                 this.timecards.splice(i, 1);
          //                 break;

          //               }
          //             }
          //              }

          //           }





          this.myMessage = data.message;
          this.triggerk = true;

          setTimeout(() => {
            this.triggerk = false;
          }, 10000);

        },
        error => {
          console.log("time card error :" + error);
          if (error.status === 0) {
            let m = moment().format('S SS SSS');
            this.myMessage = 'Unable to connect to Server...!!';
            this.er.updateErrorList("Time Card: Delete " + this.myMessage + m);
            this.staticModal.show();
          }
          else if (error.status == 500) {
            let m = moment().format('S SS SSS');
            this.myMessage = error.statusText;
            this.er.updateErrorList("Time Card:Delete " + this.myMessage + m);
            this.staticModal.show();
          }
          else {
            let m = moment().format('S SS SSS');
            this.er.updateErrorList("time card url : Delete null" + m);
            this.staticModal.show();
          }

        });

    }



  }
};
