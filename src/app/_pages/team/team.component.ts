import { TimeSheetRecord } from './../../_models/timeSheetRecord.model';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OrganizationService } from './../../_services/organization.service';
import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'mydaterangepicker';
import * as moment from 'moment';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit {
  
  timeSRecord: TimeSheetRecord[];
  private myForm: FormGroup;
  teams: any[] = [];
  showTeam = false;
  format = 'x';
  showCustom = false;
  date = new Date();
  teamId=0;

  totalWorkingMints: any;
  totalWorkedMints: any;
  totalIdleTimecard: any;
  remainingWorkhours: any;
  activeWorkhours: any;
  disputedTime:any;

  showCustomCalender() {
    this.showCustom = !this.showCustom;
  }

  storedNames = JSON.parse(localStorage.getItem("userObject"));

  constructor(private org: OrganizationService, private fb: FormBuilder, ) {
    this.getTeam();

    this.date = new Date();

    this.myDateRangePickerOptions.disableSince.year = this.date.getFullYear();
    this.myDateRangePickerOptions.disableSince.month = this.date.getMonth() + 1;
    this.myDateRangePickerOptions.disableSince.day = this.date.getDate() + 1;
  }
  public myDateRangePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    inline: false,
    disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 1 }



  };

  setDateRange(): void {
    // Set date range (today) using the setValue function
    let date = new Date();
    this.myForm.setValue({
      myDateRange: {
        beginDate: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        },
        endDate: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }

  clearDateRange(): void {
    // Clear the date range using the setValue function
    this.myForm.setValue({ myDateRange: '' });
  }

  onCustomClick(values): void {
    if (this.myForm.valid && (this.myForm.value.myDateRange.beginDate !== null || this.myForm.value.myDateRange.endDate.valid)) {
      let bMonth = this.myForm.value.myDateRange.beginDate.month;
      let bDay = this.myForm.value.myDateRange.beginDate.day;
      let bYear = this.myForm.value.myDateRange.beginDate.year;

      //console.log("oBJ"+ this.myForm.value.myDateRange);

      let eMonth = this.myForm.value.myDateRange.endDate.month;
      let eDay = this.myForm.value.myDateRange.endDate.day;
      let eYear = this.myForm.value.myDateRange.endDate.year;

      let startDate = moment.utc(bYear + '-' + bMonth + '-' + bDay).format("YYYY-MM-DD");;
      let endDate = moment.utc(eYear + '-' + eMonth + '-' + eDay).format("YYYY-MM-DD");;

      console.log("Custom Start Date :   " + bYear + '-' + bMonth + '-' + bDay);
      console.log("Custom End Date :   " + eYear + '-' + eMonth + '-' + eDay);
      // console.log("Start Unix: " + sDate + ", End Unix: " + eDate);

      this.org.getTeamTimeSheet(1, startDate, endDate).subscribe(data => {

        let t=this.timeSheetModified(data.data);
        console.log(t);
        this.timeSRecord=t;
        this.showTeam = true;

        let count = 0;

        // console.log(this.timeSRecord)
        this.teams.forEach(team => {
          if(team.id===1 && count===0)
          {
           
            team.members.forEach(tMember => {
              
              this.timeSRecord.forEach(tSR => {
                
                if(tSR.userId==tMember.userId){
                  tSR.member=tMember;
                            
                }
                
              });
           
            });
          }
          count=count+1;
                
        });
        
      }, error => { });

    }

  }

  ngOnInit() {

    this.storedNames = JSON.parse(localStorage.getItem("userObject"));
    this.myForm = this.fb.group({
      myDateRange: ['', Validators.required]

    });
  }

  getTeam() {

    let id = this.storedNames.organizationId;
    this.org.getOrganizationTeam(id).subscribe(data => {
     
      this.teams = data.data;
     
      this.showTeam = false;


    },
      error => { });

  }
  backToList() {
    this.showTeam = false;
  }
  getAllTeamTimeSheet(id) {
    console.log(id);
    this.teamId=id;
    let date = new Date();
    let startDate: any = moment.utc(date).format("YYYY-MM-DD");;
    let endDate: any = moment.utc(date).format("YYYY-MM-DD");;
    this.org.getTeamTimeSheet(id, startDate, endDate).subscribe(data => {

      let t=this.timeSheetModified(data.data);
      console.log(t);
      this.timeSRecord=t;
      this.showTeam = true;
      let count = 0;
   
      // console.log(this.timeSRecord)
      this.teams.forEach(team => {
        if(team.id===1 && count===0)
        {
         
          team.members.forEach(tMember => {
            
            this.timeSRecord.forEach(tSR => {
              
              if(tSR.userId==tMember.userId){
                tSR.member=tMember;
                          
              }
              
            });
         
          });
        }
        count=count+1;
       
      });
    }, error => { });

    this.showTeam = true;
  }

  getSpecificTeamsheet(n:any)
  {
    this.showCustom=false;
this.org.getSpecificTimesheet(this.teamId,n).subscribe(data=>{
  
  let t=this.timeSheetModified(data.data);
  console.log(t);
  this.timeSRecord=t;
  this.showTeam = true;
  let count = 0;

  // console.log(this.timeSRecord)
  this.teams.forEach(team => {
    if(team.id===1 && count===0)
    {
     
      team.members.forEach(tMember => {
        
        this.timeSRecord.forEach(tSR => {
          
          if(tSR.userId==tMember.userId){
            tSR.member=tMember;
                      
          }
          
        });
     
      });
    }
    count=count+1;
    
  });
  
},
error=>{});

  }

  timeSheetModified(timesheets){

    let finalTimeSArray:any[]=[];
console.log("modification area")
    console.log(timesheets);
    
    timesheets.forEach(n => {

  this.totalWorkingMints = n.totalMinutes;
  this.totalWorkedMints = n.totalWorked;
  this.totalIdleTimecard = n.totalIdle;
  this.disputedTime=n.totalDisputed;
  this.activeWorkhours = this.totalWorkedMints - this.totalIdleTimecard;
  this.remainingWorkhours = this.totalWorkingMints - this.activeWorkhours;

  // totalWorkingMints
  if (this.totalWorkingMints > 60) {
    let h = Math.floor(this.totalWorkingMints / 60);
    let m = this.totalWorkingMints % 60;
    // this.totalWorkingMints = h + " h";//+ m+ "   mins";
    this.totalWorkingMints = h + ":"+ m;

  }
  // totalWorkedMints
  if (this.totalWorkedMints > 60) {
    let h = Math.floor(this.totalWorkedMints / 60);
    let m = this.totalWorkedMints % 60;
    // this.totalWorkedMints = h + " h ," + m + " min";
    this.totalWorkedMints = h + ":" + m;

  }
  else if (this.totalWorkedMints <= 60) {
    // this.totalWorkedMints = this.totalWorkedMints + " min"
    this.totalWorkedMints = '0:'+this.totalWorkedMints ;
    
  }

   // disputedTime
   if (this.disputedTime > 60) {
    let h = Math.floor(this.disputedTime / 60);
    let m = this.disputedTime % 60;
    // this.disputedTime = h + " h ," + m + " min";
    this.disputedTime = h + ":" + m ;

  }
  else if (this.disputedTime <= 60) {
    this.disputedTime ='0:'+ this.disputedTime;
  }

  // totalIdleTimecard
  if (this.totalIdleTimecard > 60) {
    let h = Math.floor(this.totalIdleTimecard / 60);
    let m = this.totalIdleTimecard % 60;
    // this.totalIdleTimecard = h + " h ," + m + " min";
    this.totalIdleTimecard = h + ":" + m ;

  }
  else if (this.totalIdleTimecard <= 60) {
    // this.totalIdleTimecard = this.totalIdleTimecard + " min"
    this.totalIdleTimecard ='0:'+ this.totalIdleTimecard ;
    
  }

  // activeWorkhours
  if (this.activeWorkhours > 60) {
    let h = Math.floor(this.activeWorkhours / 60);
    let m = this.activeWorkhours % 60;
    // this.activeWorkhours = h + " h ," + m + " min";
    this.activeWorkhours = h + ":" + m;

  }
  else if (this.activeWorkhours <= 60) {
    // this.activeWorkhours = this.activeWorkhours + " min";
    this.activeWorkhours = '0:'+this.activeWorkhours;
    
  }

  // remainingWorkhours
  if (this.remainingWorkhours > 60) {
    let h = Math.floor(this.remainingWorkhours / 60);
    let m = this.remainingWorkhours % 60;
    // this.remainingWorkhours = h + " h ," + m + " min";
    this.remainingWorkhours = h + ":" + m ;

  }
  else if (this.remainingWorkhours <= 60) {
    // this.remainingWorkhours = this.remainingWorkhours + " min"
    this.remainingWorkhours ='0:'+ this.remainingWorkhours;
    
  }

  let obj={
    userId:n.userId,
    totalMinutes:this.totalWorkingMints,
    totalWorked:this.totalWorkedMints,
    totalIdle:this.totalIdleTimecard,
    totalDisputed:this.disputedTime,
    totalRemainingTime:this.remainingWorkhours
  }
  finalTimeSArray.push(obj);  
});


return finalTimeSArray;




  }

}
