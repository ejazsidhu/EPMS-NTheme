import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from "mydatepicker";
@Component({
  selector: 'holiday-picker',
  templateUrl: './holiday-picker.component.html',
  styleUrls: ['./holiday-picker.component.css']
})
// export class HolidayModel{
//   public model:{date:{
//     year:string,
//     month:string,
//     day:string

//   },
//   HolidayTitle:string
// };
// }


export class HolidayPickerComponent implements OnInit {

  myMessage='';
  constructor() { 
    let date=new Date();
  

    this.myDatePickerOptions.disableUntil.year = date.getFullYear();
    this.myDatePickerOptions.disableUntil.month = date.getMonth() + 1;
    this.myDatePickerOptions.disableUntil.day = date.getDate() + 1;
  }

  ngOnInit() {
  }



  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    // sunHighlight:false,
    // satHighlight:true,
    // firstDayOfWeek:'sat'
    editableDateField:false,
    disableUntil: {year: 2016, month: 8, day: 10}

};
todaydate=new Date()
// Initialized to specific date (09.10.2018).
public model = { date: { year: this.todaydate.getFullYear(), month: this.todaydate.getMonth()+1, day: this.todaydate.getDate() },HolidayTitle:'' };
dateArray=[];
sendForm(m){
  console.log(m);
  let dateRange=[];

  for (var i = 0; i < this.dateArray.length; i++) {
    dateRange.push(this.dateArray[i].date);
    
  }
  
  let holidayPayload={
    title:m.HolidayTitle,
    date:dateRange

  }
  console.log(holidayPayload);
  // this.model = { date: { year: this.todaydate.getFullYear(), month: this.todaydate.getMonth()+1, day: this.todaydate.getDate() },HolidayTitle:'' };
}

onSubmit(n){
if(n!=null){
  this.dateArray.push(n);
  console.log(n);
  // console.log(this.dateArray);
//  for (var i = 0; i < this.dateArray.length; i++) 
//  {
//    console.log(this.dateArray[i].date);
   
//  }

}
}

}
