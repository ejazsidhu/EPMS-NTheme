import { Component, Input, ViewChild, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: 'active-hours',
  templateUrl: './active-hours-chart.html'
})
export class ActiveHoursChartComponent {
  @ViewChild(BaseChartDirective) workedhours_chart: BaseChartDirective;
  constructor() {
    //this.workedhours_chart.draw.ctx.filledtext("la la la")
    // this.workedhours_chart.chart.ctx.filledtext("la la la");

  }


  @Input('defaultValue') ActiveHourChartDataValue: any[];
  // Doughnut
  public workedhours_chartLabels: string[] = ['Idle Time', 'Active Working Hours', 'Remaining Working Hours'];
  public workedhours_chartData: any[] = [0, 0, 0];
  public workedhours_chartType: string = 'doughnut';


  public workedhours_chartOptions: any = {
    
    maintainAspectRatio: false,
    responsive: true,
    cutoutPercentage: 55,
    rotation: Math.PI,
    // circumference: Math.PI * this.workedhours_chartData[1],
    // segmentShowStroke: false,
    animation: {
      animateScale: true,
      // console.log(this.returnVAlue);

      onComplete: function () {

        // console.log(this.chart);

        // console.log(this.chart.config.data.datasets[0].data[1]);
        var acHour = this.chart.config.data.datasets[0].data[1];
        var remainingHour = this.chart.config.data.datasets[0].data[2];

        // this.chart.config.data.datasets[0].data[1]= (acHour / 60) ;
        var totalHour = acHour + remainingHour;
        // console.log(totalHour);
        var perct = ((acHour / totalHour) * 100).toFixed(0);
        // console.log("total mints are : "+totalHour);
        // this.chart.data[0];
        var width = this.chart.width,
          height = this.chart.height;

        var fontSize = (height / 110).toFixed(2);
        this.chart.ctx.font = fontSize + "em Verdana";
        this.chart.ctx.fillStyle = "#58D68D";

        this.chart.ctx.textBaseline = "middle";

        var text = "82%",
          textX = Math.round((width - this.chart.ctx.measureText(text).width) /2),
          textY = height / 1.7;

        this.chart.ctx.fillText(perct + "%", textX, textY);



      }
    },

    tooltips: {
      yAlign: 'bottom',
      callbacks: {
        label: function (tooltipItem, data) {
          //get the concerned dataset
          var dataset = data.datasets[tooltipItem.datasetIndex];
          //calculate the total of this data set
          var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue;
          });
          //get the current items value
          var currentValue = dataset.data[tooltipItem.index];
          //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
          // var precentage = Math.floor(((currentValue/total) * 100)+0.5);

          if (currentValue <= 60) {
            currentValue = currentValue + " min"
          }
          else if (currentValue > 60) {
            let h = Math.floor(currentValue / 60);
            let m = currentValue % 60;
            currentValue = h + " h ," + m + " min";


          }

          return currentValue;
        }
      }
    }

  }

  changeLabel(n: any) {
    if (n > 60) {
      let h = Math.floor(n / 60);
      let m = n % 60;
      return +Number(h) + "." + Number(m);
      // return  Number(h) +" h, " + Number(m)+" m"  ;
    }
    else {
      return "00." + Number(n);
    }
  }

 
  ngOnChanges(changes: SimpleChanges) {
    this.ActiveHourChartDataValue;
    for (let propName in changes) {


      let changedProp = changes[propName];
      if (!changedProp.isFirstChange()) {

        if (propName == 'ActiveHourChartDataValue') {
          //   this.ActiveHourChartDataValue.push(changedProp.currentValue);
          //   this.ActiveHourChartDataValue = ;
          // console.log("in ts ActiveHourChartDataValue" + this.ActiveHourChartDataValue);
          // this.workedhours_chartData = this.ActiveHourChartDataValue;
          this.workedhours_chartData = changedProp.currentValue;
          //    this.workedhours_chartLabels = this.ActiveHourChartLabelsValue;

          // this.workedhours_chartOptions.animation.onComplete.filltext(70+ "%", 100, 100);
          // this.percentageCounter=this.workedhours_chartData[0]*this.workedhours_chartData[1]/100;
          let v1 = this.changeLabel(this.workedhours_chartData[0]);
          let v2 = this.changeLabel(this.workedhours_chartData[1] - this.workedhours_chartData[0]);
          let v3 = this.workedhours_chartData[0]
          let v4 = this.workedhours_chartData[1] - this.workedhours_chartData[0];
          let v5 = this.workedhours_chartData[2]
          // console.log("v1 and v2 : " + v1, v2);

          this.workedhours_chartData = [v5, v3, v4];



        }



        this.workedhours_chart.ngOnChanges({} as SimpleChanges);

      }

    }

  }


}