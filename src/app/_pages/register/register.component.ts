import { Component, ViewChild } from '@angular/core';
import { RegisterModel } from '../../_models/register.model';
import { RegisterService } from '../../_services/register.service';
import { ModalDirective } from 'ng2-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from "app/validators";
import { ChangePasswordService } from "app/_services/changePassword.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css'],

  providers: [RegisterService, EmailValidator, EqualPasswordsValidator, ChangePasswordService],
})
export class RegisterComponent {
  triggerk: boolean=false;
  @ViewChild('staticModal') public staticModal: ModalDirective;
  public myMessage = '';
  public user: RegisterModel;
  public form: FormGroup;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public email: AbstractControl;
  public timezone: AbstractControl;
  public passwords: FormGroup;
  public newPassword: AbstractControl;
  public repeatPassword: AbstractControl;
  public companyName:AbstractControl;
  public mondayCBox:AbstractControl;
  public tuesdayCBox:AbstractControl;
  public wedCBox:AbstractControl;
  public thursdayCBox:AbstractControl;
  public fridayCBox:AbstractControl;
  public saturdayCBox:AbstractControl;
  public sundayCBox:AbstractControl;

  public timezoneData:any;

  changeClass = false;

  ngOnInit() {
 
  }
  getTimezoneID(){

    this._registerService._getTimezoneID().subscribe(
        data => {
          // this.changeClass = false;
          // console.log("timexone id  : "+data.data[0].timezoneId);
          this.timezoneData=data.data;
          // this.myMessage = data.message +"\n"+"\n Go to your email account to verify.";
          // this.staticModal.show();

          //  setTimeout(() => {
          //   // this.triggerk = false;
          //   this.router.navigate(['login']);
          // }, 7000);
        },
        error => {
          this.changeClass = false;
          console.log(error);
          console.log(error.status);
          if (error.status === 0) {
            this.staticModal.show();
            this.myMessage = "Unable to access to Server";
          }
          if (error.status === 500) {
            console.log(error);

            let body = error.text();
            let bodyObject = JSON.parse(error);
            this.myMessage = ' , ' + error.status;
            this.myMessage += ' , ' + error.statusText;
            this.myMessage += ' , ' + bodyObject.exception;
            this.staticModal.show();
          }
        });

  }



  constructor(fb: FormBuilder, public _registerService: RegisterService, private _changePassword: ChangePasswordService, private router: Router) {
   this.getTimezoneID();
   
    this.form = fb.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate, Validators.minLength(4)])],
      'timezone': ['', Validators.compose([Validators.required])],
'companyName': ['', Validators.compose([Validators.required])],
'mondayCBox': [false],
'tuesdayCBox': [false],
'wedCBox': [false],
'thursdayCBox': [false],
'fridayCBox': [false],
'saturdayCBox': [false],
'sundayCBox': [false],


      'passwords': fb.group({
        'newPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('newPassword', 'repeatPassword') })
    });

    this.firstName = this.form.controls['firstName'];
    this.lastName = this.form.controls['lastName'];
    this.email = this.form.controls['email'];
    this.timezone = this.form.controls['timezone'];
     this.companyName = this.form.controls['companyName'];
    this.mondayCBox=this.form.controls['mondayCBox'],
    this.tuesdayCBox=this.form.controls['tuesdayCBox'],
    this.wedCBox=this.form.controls['wedCBox'],
    this.thursdayCBox=this.form.controls['thursdayCBox'],
    this.fridayCBox=this.form.controls['fridayCBox'],
    this.saturdayCBox=this.form.controls['saturdayCBox'],
    this.sundayCBox=this.form.controls['sundayCBox'],

    this.passwords = <FormGroup>this.form.controls['passwords'];
    this.newPassword = this.passwords.controls['newPassword'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }



  public onSubmit(values) {
    console.log(values);
    console.log("tmID" +this.form.value.timezoneID,)
    if (this.form.valid) {
      let model = {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        timezone: this.form.value.timezone,
        monday:this.form.value.mondayCBox,
        tuesday:this.form.value.tuesdayCBox,
        wednesday:this.form.value.wedCBox,
        thursday:this.form.value.thursdayCBox,
        friday:this.form.value.fridayCBox,
        saturday:this.form.value.saturdayCBox,
        sunday:this.form.value.sundayCBox,
        companyName:this.form.value.companyName,
        password: this.form.value.passwords.newPassword,
        status: 'Pending'

      }

      console.log(model)
      this.changeClass = true;
      this._registerService.register(JSON.stringify(model)).subscribe(
        data => {
          this.changeClass = false;
          console.log(data);
          this.myMessage = data.message +"\n"+"\n Go to your email account to verify.";
          this.triggerk = true;
          // this.staticModal.show();

           setTimeout(() => {
            this.triggerk = false;
            this.router.navigate(['login']);
          }, 7000);
        },
        error => {
          this.changeClass = false;
          console.log(error);
          console.log(error.status);
          if (error.status === 0) {
            // this.staticModal.show();
            this.myMessage = "Unable to access to Server";
            this.triggerk = true;
          }
          if (error.status === 500) {
            console.log(error);

            let body = error.text();
            let bodyObject = JSON.parse(error);
            this.myMessage = ' , ' + error.status;
            this.myMessage += ' , ' + error.statusText;
            this.myMessage += ' , ' + bodyObject.exception;
            this.triggerk = true;
            // this.staticModal.show();
          }
        });
    }
  }
}