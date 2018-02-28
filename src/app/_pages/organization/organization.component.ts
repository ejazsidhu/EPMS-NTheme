import { OrganizationModel } from './../../_models/organization.model';
import { ModalDirective } from 'ng2-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { OrganizationService } from './../../_services/organization.service';
import { ConfigService } from './../../_services/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html'
})
export class OrganizationComponent implements OnInit {
  orgId: any;
  myMessage = '';
  @ViewChild('staticModal') public staticModal: ModalDirective;

  storedNames = JSON.parse(localStorage.getItem("userObject"));
  public form: FormGroup;
  displayName: AbstractControl;
  OrganizationName: any[] = [];


  constructor(public org: OrganizationService, private fb: FormBuilder) {
    this.storedNames = JSON.parse(localStorage.getItem("userObject"));

    // console.log(this.OrganizationName);
    this.form = this.fb.group({
      'displayName': ['', Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(4)])]
    });
    this.displayName = this.form.controls['displayName'];

  }

  ngOnInit() {
    this.getOrg();
    
    // console.log(this.OrganizationName);

  }

  getOrg() {
    let id = this.storedNames.organizationId;
    this.org.getOrganization(id).subscribe(data => {
      console.log(data);
      this.OrganizationName = data.data;
      this.orgId = data.data.id

      this.form = this.fb.group({
        'displayName': [data.data.displayName, Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(4)])]
      });
      this.displayName = this.form.controls['displayName'];
      //console.log(this.OrganizationName);  
    },
      error => { });

  }



  onSubmit(m) {
    let n: string = m.displayName;

    //   var date = new Date();
    // var dateTime = moment.utc(date).format("DD-MM-YYYY");
    let org: OrganizationModel = {
      id: 0,
      displayName: m.displayName,
      lowerName: n.toLowerCase()
    }

    this.org.UpdateOrganization(this.orgId, org).subscribe(data => {

      console.log(data.message)
      this.myMessage = data.message;
      this.staticModal.show();
    },
      error => {

      });



  }




}
