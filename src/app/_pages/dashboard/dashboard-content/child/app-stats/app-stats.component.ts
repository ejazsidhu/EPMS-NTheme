
import { DashboardService } from '../../../../../_services/dashboard.service';
import { Component, OnInit, ViewChild, AfterViewInit, SimpleChanges, Input, OnChanges, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DashboardContentService } from '../../../../../_services/dashboard-content.service';
import { AppStatsModel } from '../../../../../_models/AppStats.model';
//import { WorkingHoursComponent } from './working-hours.component';
import { ModalDirective } from 'ng2-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseChartDirective } from 'ng2-charts/ng2-charts'
@Component({
  selector: 'app-stats',
  templateUrl: './app-stats.component.html',
  providers: [DashboardContentService],
  
})
export class ApplicationStatsComponent implements OnChanges {

  @ViewChild(BaseChartDirective) app_chart: BaseChartDirective;

  @Input('defaultLabel') label1;
  @Input('defaultValue') value1;
  myMessage = '';
  token_value: string;
  token_name = 'x-auth-token';
  i = 0;
  public timecards;
  //bar chart start application stats
  public AppChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          if (tooltipItem.xLabel > 60) {
            let h = Math.floor(tooltipItem.xLabel / 60);
            let m = tooltipItem.xLabel % 60;
            return  Number(h) +" h, " + Number(m)+" min"  ;
          }
          else {
            return Number(tooltipItem.xLabel) + "  min";
          }
          // return Number(tooltipItem.xLabel) + "  Min";

        }
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          userCallback: function (value) {
            if (value > 60) {
              let h = Math.floor(value / 60);
              let m = value % 60;

              return Number(Math.floor(h)) +"  h, "  + Number(Math.ceil(m))+"  min";
            }

            else {
              return Math.round((value) * 100) / 100 + "  min";
            }
          },

        }
      }]
    },
  };

  public AppChartLabels: string[] = ['App 1', 'App 2', 'App 3'];

  //public barChartLabels=this.appStatsData[1].processName;
  public AppChartType: string = 'bar';
  public AppChartLegend: boolean = false;

  public AppChartData: any[] = [
    { data: [10, 20, 20], label: 'Application Statistics' },
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  @ViewChild('staticModal') public staticModal: ModalDirective;

  constructor(private service: DashboardContentService, private _service: DashboardService, private router: Router) { }
  ngOnInit() {
    // console.log(this.label1 + ' aaa ' + this.value1);
    this.AppChartLabels = this.label1;
    this.AppChartData[0].data = this.value1;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.label1 = [];
    this.value1 = [];
    for (let propName in changes) {


      let changedProp = changes[propName];
      if (!changedProp.isFirstChange()) {
        // console.log("property changed " + propName);

        // console.log('Previous value: ' + changedProp.previousValue + ' NewValue: ' + changedProp.currentValue + ' ' + propName);
        if (propName == 'label1') {

          this.label1 = changedProp.currentValue;
          // console.log("in ts label1" + this.label1);
          //  this.AppChartLabels=this.label1;
          this.app_chart.labels = this.label1;

        } else if (propName == 'value1') {
          // this.value1.push(changedProp.currentValue);
          this.value1 = changedProp.currentValue;
          // console.log("in ts value1" + this.value1);
          this.AppChartData[0].data = this.value1;
          //  this.AppChartLabels = this.label1;


        }
this.app_chart.ngOnChanges({} as SimpleChanges);
        // if (this.label1.length > 0 || this.value1.length > 0) {
        //   // console.log("in ts value1 " + this.value1);
        //   // console.log("in ts label1 " + this.label1);
        //   // debugger;
        //   this.app_chart.ngOnChanges({} as SimpleChanges);

        // }
      }

    }

  }

}

