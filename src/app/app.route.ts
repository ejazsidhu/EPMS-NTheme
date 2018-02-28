import { TeamComponent } from './_pages/team/team.component';
import { OrganizationComponent } from './_pages/organization/organization.component';
import { HolidayPickerComponent } from './_pages/admin/holiday-picker/holiday-picker.component';
import { AllUsersComponent } from './_pages/admin/all-users/all-users.component';

import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_pages/login/login.component';
import { RegisterComponent } from './_pages/register/register.component';
import { VerificationComponent } from './_pages/verification/verification.component';
import { NotificationComponent } from './_pages/dashboard/notification/notification.component';

import { DateRangeComponent } from './_pages/dashboard/dashboard-content/child/date-range/date-range.component';
import { WorkingHoursComponent } from './_pages/dashboard/dashboard-content/child/work-stats/working-hours.component';



import { SettingComponent } from './_pages/dashboard/settings/setting.component';
import { ChangePasswordComponent } from './_pages/dashboard/user/change-password/change-password.component';
import { EditProfileComponent } from './_pages/dashboard/user/edit-profile/edit-profile.component';
import { LogoutComponent } from './_pages/dashboard/user/logout/logout.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from "app/_pages/PageNotFound/page-not-found.component";
import { Timecard2Component } from "app/_pages/dashboard/timecard-2/timecard-2.component";
import { ResetPasswordComponent } from "app/_pages/reset-password/reset-password.component";
import { AddNewPasswordComponent } from "app/_pages/reset-password/add-new-password/add-new-password.component";
import { HomeComponent } from "app/_pages/home/home.component";
import { PricingComponent } from "app/_pages/pricing/pricing.component";
import { Timecard3Component } from "app/_pages/dashboard/timecard-3/timecard-3.component";
import { DashboardContent2Component } from "app/_pages/dashboard/dashboard-content-2/dashboard-content-2.component";
export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    { path: 'home', component: HomeComponent },


    { path: 'pricing', component: PricingComponent },
    { path: 'login', component: LoginComponent },

    { path: 'register', component: RegisterComponent },
    { path: 'verification', component: VerificationComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'date-rabge', component: DateRangeComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'passwd/reset', component: AddNewPasswordComponent },



    /*here we are going to set child routes for dashboard related component */
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [

            {
                path: '',
                component: DashboardContent2Component
            },
            {
                path: 'orgProfile',
                component: OrganizationComponent
            },
            {
                path: 'team',
                component: TeamComponent
            },
            {
                path: 'notification',
                component: NotificationComponent
            },
            {
                path: 'dashboard',
                component: DashboardContent2Component
            },
            {
                path: 'dashboard-content',
                component: DashboardContent2Component
            }
            ,
            {
                path: 'dashboard-content-2',
                component: DashboardContent2Component
            }
            ,
            {
                path: 'edit-profile',
                component: EditProfileComponent
            }
           
            ,
            {
                path: 'timecard',
                component: Timecard2Component
            },
            {
                path: 'timecard-3',
                component: Timecard3Component
            }

            ,
            {
                path: 'change-password',
                component: ChangePasswordComponent
            }
            ,
            {
                path: 'working-hours',
                component: WorkingHoursComponent
            }
            ,
            {
                path: 'setting',
                component: SettingComponent
            }
            ,
            {
                path: 'logout',
                component: LogoutComponent
            },
            {
                path: 'all-users',
                component: AllUsersComponent

            },
            {
                path: 'holiday-picker',
                component: HolidayPickerComponent

            }

            
        ]
    },

    { path: '**', component: PageNotFoundComponent },
];
export const Router: ModuleWithProviders = RouterModule.forRoot(appRoutes);