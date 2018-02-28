
import { DashboardService } from '../../../_services/dashboard.service';

import { Component, OnInit, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DashboardContentService } from '../../../_services/dashboard-content.service';
import { AppStatsModel } from '../../../_models/AppStats.model';
import { WorkingHoursComponent } from '../dashboard-content/child/work-stats/working-hours.component';
import { DateRangeComponent } from '../dashboard-content/child/date-range/date-range.component';
import { ConfigService } from '../../../_services/config.service';
import { ErrorRegisterService } from '../../../_services/error-register.service';

import { ModalDirective } from 'ng2-bootstrap';
import * as moment from 'moment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BaseChartDirective } from 'ng2-charts/ng2-charts'

@Component({
  selector: 'app-dashboard-content-2',
  templateUrl: './dashboard-content-2.component.html',
  styleUrls: ['./dashboard-content-2.component.css'],
  providers: [DashboardService, DashboardContentService, ConfigService]
})
export class DashboardContent2Component implements OnInit {
  



  userTimeZone: any;

  storedNames = JSON.parse(localStorage.getItem("userObject"));
  labelDashboard = ['app1', 'app2', 'app3', 'app4', 'app5'];
  valueDashboard = [0, 0, 0, 0, 0];
  day = Date.now();
  format = 'x';
  format2 = 'S SS SSS'
  wDuration = [];
  wDate = [];

  totalWorkingMints: any;
  totalWorkedMints: any;
  totalIdleTimecard: any;
  remainingWorkhours: any;
  activeWorkhours: any;
  disputedTime: any;
  
  n2: any;
  n1: any;
  n4: any;
  n3: any;

  public ActiveHourChartData: any[] = [0, 0,0];
  myMessage = '';
  duration="Today"
  // token_value: ;
  // token_name = 'x-auth-token';
  @ViewChild('staticModal') public staticModal: ModalDirective;

  constructor(private service: DashboardContentService,
    private _service: DashboardService,
    private router: Router, private cs: ConfigService,
    private er: ErrorRegisterService) { }

  ngOnInit() {
    let todayDate = moment(this.day).format(this.format);
    // var storedNames = JSON.parse(localStorage.getItem("userObject"));
    let id = this.storedNames.userID
    // console.log("user id Check: " + id);
    // this.getAppStats(id, todayDate, todayDate);
    this.getAppStats(id, "today");
    

    this.userTimeZone = this.storedNames.timeZone;
    this.getWorkHoursStats(id, "today");
    this.getTotalWorrkingHoursStats(id, "today");
    this.duration="Today"

  }

  //calling service currunt date
  getAppStats(id, sDate) {
    let token_value = this.storedNames.token;
    // token_value = window.localStorage.getItem(this.token_name);
    this.service.getApplicationStats(id, sDate).subscribe(
      data => {
        // console.log(data.data);
        this.labelDashboard = [];
        this.valueDashboard = [];
        for (let dat of data.data) {
          this.labelDashboard.push(dat.processName);
          // this.valueDashboard.push(dat.duration);

          if (dat.duration > 60) {
            let n = (Math.round(dat.duration / 3) * 3) % 60
            this.valueDashboard.push(dat.duration);
          }
          else {
            this.valueDashboard.push(Math.round((dat.duration) * 100) / 100);
          }
        } 
      },
      error => {
        // console.log('error Body' + error);
        // console.log('error is: ' + error.url);
        // console.log(error);
        if (error.status === 0) {
          let m = moment().format('S SS SSS');
          // console.log("value of m : " + m);
          this.myMessage = 'Unable to connect to Server...!!';
          this.er.updateErrorList("DashBoard-content:App-Stats " + this.myMessage + m);
          this.staticModal.show();
        }
        else if (error.status == 500) {
          let m = moment().format('S SS SSS');
          // console.log("value of m : " + m);
          this.myMessage = error.statusText;
          this.er.updateErrorList("DashBoard-content: App-Stats" + this.myMessage + m);
          this.staticModal.show();
        }
        else {
          let m = moment().format('S SS SSS');
          // console.log("value of m : " + m);
          this.er.updateErrorList("DashBoard-content:App-Stats url : null" + m);
        }

      });
  }

  //calling work hours sevice current date
  getWorkHoursStats(id, sDate) {
    let token_value = this.storedNames.token;
    // this.token_value = window.localStorage.getItem('x-auth-token');
    this.service.getWorkingHours(id, sDate).subscribe(
      data => {
        //  console.log("working Hours:  " + data);
        this.wDate = [];
        this.wDuration = [];
        for (let w of data.data) {
          //converting unix timstamp into date
          this.wDate.push(moment(w.date).format("DD MMM YYYY"));

          if (w.duration > 60) {
            let n = (Math.round(w.duration));
            this.wDuration.push(w.duration);
          }
          else {
            this.wDuration.push(Math.round((w.duration) * 100) / 100);
          }

        }
      },
      error => {
        // console.log('error Body' + error);
        // console.log('error is: ' + error.url);
        // console.log(error.status);
        //  let tm=new Date();
        if (error.status === 0) {
          let m = moment().format('S SS SSS');
          // console.log("value of m : " + m);


          this.myMessage = 'Unable to connect to Server...!!';
          this.er.updateErrorList("DashBoard-content: Work Hours ,status = 0" + this.myMessage + m);
          this.staticModal.show();
        }
        else if (error.status == 500) {
          this.myMessage = error.statusText;
          let m = moment().format('S SS SSS');
          // console.log("value of m : " + m);
          this.er.updateErrorList("DashBoard-content:Work Hours ,status =500 " + this.myMessage + m);

          this.staticModal.show();
        }
        else {
          let m = moment().format('S SS SSS');
          // console.log("value of m : " + m);
          this.er.updateErrorList("DashBoard-content:Work Hours ,status =url : null" + m);

        }



      });

  }


  //calling service currunt date for getting total mintes
  getTotalWorrkingHoursStats(id, sDate) {
    let token_value = this.storedNames.token;
    // token_value = window.localStorage.getItem(this.token_name);
    this.service.getTotalWorkMintes(id, sDate).subscribe(
      data => {
         console.log(data.data);

        this.totalWorkingMints = data.data.totalMinutes;
        this.totalWorkedMints = data.data.totalWorked;
        this.totalIdleTimecard = data.data.totalIdle;
        this.disputedTime=data.data.totalDisputed;
        this.activeWorkhours = this.totalWorkedMints - this.totalIdleTimecard;
        this.remainingWorkhours = this.totalWorkingMints - this.activeWorkhours;
        this.n1 = this.activeWorkhours;
        
        this.n2 = this.remainingWorkhours;
        this.n3 = this.totalWorkingMints;
        this.n4=this.totalIdleTimecard;


        // totalWorkingMints
        if (this.totalWorkingMints > 60) {
          let h = Math.floor(this.totalWorkingMints / 60);
          let m = this.totalWorkingMints % 60;
          this.totalWorkingMints = h + " h";//+ m+ "   mins";

        }

        // disputedTime
   if (this.disputedTime > 60) {
    let h = Math.floor(this.disputedTime / 60);
    let m = this.disputedTime % 60;
    this.disputedTime = h + " h ," + m + " min";

  }
  else if (this.disputedTime <= 60) {
    this.disputedTime = this.disputedTime + " min"
  }

        // totalWorkedMints
        if (this.totalWorkedMints > 60) {
          let h = Math.floor(this.totalWorkedMints / 60);
          let m = this.totalWorkedMints % 60;
          this.totalWorkedMints = h + " h ," + m + " min";

        }
        else if (this.totalWorkedMints <= 60) {
          this.totalWorkedMints = this.totalWorkedMints + " min"
        }

        // totalIdleTimecard
        if (this.totalIdleTimecard > 60) {
          let h = Math.floor(this.totalIdleTimecard / 60);
          let m = this.totalIdleTimecard % 60;
          this.totalIdleTimecard = h + " h ," + m + " min";

        }
        else if (this.totalIdleTimecard <= 60) {
          this.totalIdleTimecard = this.totalIdleTimecard + " min"
        }

        // activeWorkhours
        if (this.activeWorkhours > 60) {
          let h = Math.floor(this.activeWorkhours / 60);
          let m = this.activeWorkhours % 60;
          this.activeWorkhours = h + " h ," + m + " min";

        }
        else if (this.activeWorkhours <= 60) {
          this.activeWorkhours = this.activeWorkhours + " min"
        }

        // remainingWorkhours
        if (this.remainingWorkhours > 60) {
          let h = Math.floor(this.remainingWorkhours / 60);
          let m = this.remainingWorkhours % 60;
          this.remainingWorkhours = h + " h ," + m + " min";

        }
        else if (this.remainingWorkhours <= 60) {
          this.remainingWorkhours = this.remainingWorkhours + " min"
        }

        // console.log("n value :" + this.n1 + " " + this.n2);
        this.ActiveHourChartData = [this.n1, this.n3,this.n4];

      },
      error => {
        // console.log('error Body' + error);
        // console.log('error is: ' + error.url);
        // console.log(error);
        if (error.status === 0) {
          let m = moment().format('S SS SSS');
          // console.log("value of m : " + m);
          this.myMessage = 'Unable to connect to Server...!!';
          this.er.updateErrorList("DashBoard-content:App-Stats " + this.myMessage + m);
          this.staticModal.show();
        }
        else if (error.status == 500) {
          let m = moment().format('S SS SSS');
          // console.log("value of m : " + m);
          this.myMessage = error.statusText;
          this.er.updateErrorList("DashBoard-content: App-Stats" + this.myMessage + m);
          this.staticModal.show();
        }
        else {
          let m = moment().format('S SS SSS');
          // console.log("value of m : " + m);
          this.er.updateErrorList("DashBoard-content:App-Stats url : null" + m);
        }

      });


  }



  onTodayClicked(today: any): void {
    // console.log("parent body Today : " + today.startDate + ' - ' + today.endDate);
    let id = this.storedNames.userID
    let todayDate = moment(this.day).format(this.format);
    this.getAppStats(id, "today");
    this.getWorkHoursStats(id, "today");
    this.getTotalWorrkingHoursStats(id, "today");
    this.duration="Today"
  }
  onWeekClicked(week: any): void {
    // console.log("parent body week : " + week.startDate + ' - ' + week.endDate);
    let id = this.storedNames.userID
    this.getAppStats(id, "week");
    this.getWorkHoursStats(id, "week");
    this.getTotalWorrkingHoursStats(id, "week");
    this.duration="This Week"
    // this.getAppStats(id, week.startDate, week.endDate);
    // this.getWorkHoursStats(id, week.startDate, week.endDate);
  }
  onMonthClicked(month: any): void {
    // console.log("parent body month: " + month.startDate + ' - ' + month.endDate);
    let id = this.storedNames.userID
    this.getAppStats(id, "month");
    this.getWorkHoursStats(id, "month");
    this.getTotalWorrkingHoursStats(id, "month");
    this.duration="This Month"
    // this.getAppStats(id, month.startDate, month.endDate);
    // this.getWorkHoursStats(id, month.startDate, month.endDate);
  }
  onCustomClicked(custom: any): void {
    // console.log("parent body custom : " + custom.startDate + ' - ' + custom.endDate );
    let id = this.storedNames.userID
    // this.getAppStats(id, custom.startDate, custom.endDate);
    // this.getWorkHoursStats(id, custom.startDate, custom.endDate);

  }



}
