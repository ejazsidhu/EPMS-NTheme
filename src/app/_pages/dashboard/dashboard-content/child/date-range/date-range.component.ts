
import { Component, OnInit, ViewChild, AfterViewInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { IMyOptions } from 'mydaterangepicker';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts/ng2-charts'
import { ModalDirective } from 'ng2-bootstrap';
import * as moment from 'moment';
import {IMyDpOptions} from 'mydatepicker';

@Component({
    selector: 'date-range',
    templateUrl: './date-range.component.html',
    styleUrls:['./date-range.component.css']

})

export class DateRangeComponent implements OnInit {
    @ViewChild(BaseChartDirective) app_chart: BaseChartDirective;
    //format = 'L';
    d = new Date();
    public radioModel: string = 'Today';
    day = new Date();
    format = 'x';
    token_value: string;
    token_name = 'x-auth-token';
    key = false;
    private myForm: FormGroup;
    
        constructor(private formBuilder: FormBuilder, ) { 

        
        }



    private myDateRangePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        inline: false,


    };
    selected = false;
    @Output() today: EventEmitter<any> = new EventEmitter<any>();
    @Output() week: EventEmitter<any> = new EventEmitter<any>();
    @Output() month: EventEmitter<any> = new EventEmitter<any>();
    @Output() custom: EventEmitter<any> = new EventEmitter<any>();

    onTodayClick() {
        let todayDate = moment(this.day).format(this.format);
        // console.log("Today Date  " + todayDate);
        this.today.emit("today");
        // this.today.emit({ startDate: todayDate, endDate: todayDate });
    }
    onWeekClick() {
        let wStart = moment(this.day).startOf('week').add(1, 'day').format(this.format);
        let wEnd = moment(this.day).endOf('week').add(1, 'day').format(this.format);
        this.week.emit({ startDate: wStart, endDate: wEnd });
        let tr = { startDate: wStart, endDate: wEnd };
        // console.log("child week: " + tr.startDate + ' - ' + tr.endDate);
    }
    onMonthClick() {
        let mStart = moment(this.day).startOf('month').format(this.format);
        let mEnd = moment(this.day).endOf('month').format(this.format);
        this.month.emit({ startDate: mStart, endDate: mEnd });
        let tr = { startDate: mStart, endDate: mEnd };
        // console.log(" child month: " + tr.startDate + ' - ' + tr.endDate);
    }

    

    ngOnInit() {
        this.myForm = this.formBuilder.group({
        

            myDateRange: ['', Validators.required]
            
        });
        
    }





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
        if (this.myForm.valid && (this.myForm.value.myDateRange.beginDate !== null|| this.myForm.value.myDateRange.endDate.valid)) {
            let bMonth = this.myForm.value.myDateRange.beginDate.month;
            let bDay = this.myForm.value.myDateRange.beginDate.day;
            let bYear = this.myForm.value.myDateRange.beginDate.year;

            console.log("oBJ"+ this.myForm.value.myDateRange);

            let eMonth = this.myForm.value.myDateRange.endDate.month;
            let eDay = this.myForm.value.myDateRange.endDate.day;
            let eYear = this.myForm.value.myDateRange.endDate.year;

            // let sDate = moment(this.myForm.value.myDateRange.beginDate).subtract(1,'month').format(this.format);
            console.log("childe custome sdate :   "+this.myForm.value.myDateRange.beginDate);
            // let eDate = moment(this.myForm.value.myDateRange.endDate).subtract(1,'month').format(this.format);;
            console.log("childe custome edate :   "+this.myForm.value.myDateRange.endDate);
            let sDate = moment(bYear + '-' + bMonth + '-' +bDay).format(this.format);            
            let eDate = moment(eYear + '-' + eMonth + '-' + eDay).format(this.format);
            console.log("Custom Start Date :   " + bDay + '-' + bMonth + '-' + bYear);
            console.log("Custom End Date :   " + eDay + '-' + eMonth + '-' + eYear);
            console.log("Start Unix: " + sDate + ", End Unix: " + eDate);

            // if (sDate === eDate) {
            //     this.onTodayClick();
            // }
            
                this.custom.emit({ startDate: sDate, endDate: eDate });
            
            //     console.log("time Range Value");
            //   console.log(this.myForm.value.myDateRange);
            // console.log(this.myForm.value);
            // console.log(this.myForm.value.myDateRange.beginDate.month);
            //  console.log(this.myForm.value.myDateRange.beginDate.year);


            // let sDate = moment(this.myForm.value.myDateRange.beginDate).format(this.format);
            // console.log("childe custome sdate :   "+this.myForm.value.myDateRange.beginDate);
            // let eDate = moment(this.myForm.value.myDateRange.endDate).format(this.format);;
            // console.log("childe custome edate :   "+this.myForm.value.myDateRange.endDate);

            // let tr = { startDate: sDate, endDate: eDate };
            // console.log("childe custome date : " + tr.startDate + ' - ' + tr.endDate);
        }

    }



}


