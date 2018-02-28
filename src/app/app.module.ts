import { OrganizationService } from './_services/organization.service';
import { AllUsersComponent } from './_pages/admin/all-users/all-users.component';
import { HolidayPickerComponent } from './_pages/admin/holiday-picker/holiday-picker.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from './app.route';
import { AppComponent } from './app.component';
import { ConfigService } from './_services/config.service';
import { ErrorRegisterService } from './_services/error-register.service';
import { CarouselModule } from 'ng2-bootstrap/carousel';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { LoginComponent } from './_pages/login/login.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { TopBarComponent } from './_pages/dashboard/topBar/topBar.component';
import { SettingComponent } from './_pages/dashboard/settings/setting.component';
import { ChangePasswordComponent } from './_pages/dashboard/user/change-password/change-password.component';
import { EditProfileComponent } from './_pages/dashboard/user/edit-profile/edit-profile.component';
import { LogoutComponent } from './_pages/dashboard/user/logout/logout.component';
import { NotificationComponent } from './_pages/dashboard/notification/notification.component';
import { MyDatePickerModule } from 'mydatepicker';
import { ApplicationStatsComponent } from './_pages/dashboard/dashboard-content/child/app-stats/app-stats.component';
import { DateRangeComponent } from './_pages/dashboard/dashboard-content/child/date-range/date-range.component';
import { WorkingHoursComponent } from './_pages/dashboard/dashboard-content/child/work-stats/working-hours.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RegisterComponent } from './_pages/register/register.component';
import { VerificationComponent } from './_pages/verification/verification.component';
import { AlertModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';
// import { ModalModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { PageNotFoundComponent } from "app/_pages/PageNotFound/page-not-found.component";
import { TooltipModule } from "ng2-tooltip";
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { Timecard2Component } from "app/_pages/dashboard/timecard-2/timecard-2.component";
import { ResetPasswordComponent } from "app/_pages/reset-password/reset-password.component";
import { AddNewPasswordComponent } from "app/_pages/reset-password/add-new-password/add-new-password.component";
import { HomeComponent } from 'app/_pages//home/home.component';
import { PricingComponent } from 'app/_pages/pricing/pricing.component';

import { Timecard3Component } from './_pages/dashboard/timecard-3/timecard-3.component';

import { DashboardContent2Component } from "app/_pages/dashboard/dashboard-content-2/dashboard-content-2.component";
import { ActiveHoursChartComponent } from "app/_pages/dashboard/dashboard-content/child/activeHoursChart/active-hours-chart";
import { PageNotFoundComponent } from "app/_pages/PageNotFound/page-not-found.component";
import jwt_decode from 'jwt-decode';
import { OrganizationComponent } from './_pages/organization/organization.component';
import { TeamComponent } from './_pages/team/team.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    VerificationComponent,
    RegisterComponent,
    TopBarComponent,
    SettingComponent,
    LogoutComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    DateRangeComponent,
    WorkingHoursComponent,
    ApplicationStatsComponent,
    NotificationComponent,

    Timecard2Component,
    PageNotFoundComponent,
    ResetPasswordComponent,
    AddNewPasswordComponent,
    HomeComponent,
    PricingComponent,

    Timecard3Component,

    DashboardContent2Component,

    ActiveHoursChartComponent,
    HolidayPickerComponent ,
    AllUsersComponent,
    OrganizationComponent,
    TeamComponent  


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Router,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    MyDateRangePickerModule,
    MyDatePickerModule,
    TooltipModule,
    ButtonsModule.forRoot(),
    
    




  ],
  providers: [ConfigService,OrganizationService, ErrorRegisterService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
