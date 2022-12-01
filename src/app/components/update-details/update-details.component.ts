import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../services/account.service';
import {EntitiesListService} from '../../services/entitiesList.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {RealtorUserService} from '../../services/realtorUser.service';
import {UpdateRealtorUserDetails} from '../../models/realtor/UpdateRealtorUserDetails';
import {BrokerCompany} from '../../models/staticEntities/BrokerCompany';
import {CloserCompany} from '../../models/staticEntities/CloserCompany';
import {RealtorUserResponse} from '../../models/realtor/RealtorUserResponse';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {

  roleType: '';
  error: string;
  @Input() updateRealtorDetails: UpdateRealtorUserDetails;
  brokerSelected: BrokerCompany;
  brokers: Array<BrokerCompany>;
  closerCompanySelected: CloserCompany;
  closers: Array<CloserCompany>;
  realtorUser: RealtorUserResponse;

  constructor(private router: Router,
              private realtorUserService: RealtorUserService,
              private entitiesListService: EntitiesListService,
              @Inject(LOCAL_STORAGE) private localStorage: WebStorageService) {
    this.realtorUser = new RealtorUserResponse();
    this.updateRealtorDetails = new UpdateRealtorUserDetails();
    this.updateRealtorDetails.email = this.localStorage.get('currentUser');
    this.roleType = this.localStorage.get('userType');
    this.brokers = new Array<BrokerCompany>();
    this.brokers.push(new BrokerCompany(-1, 'Select one'));
    this.brokerSelected = this.brokers[0];
    this.closers = new Array<CloserCompany>();
    this.closers.push(new CloserCompany(-1, 'Select one'));
    this.closerCompanySelected = this.closers[0];

    console.log(this.closers);
  }

  ngOnInit() {
    this.realtorUserService.getRealtorUser(this.localStorage.get('currentUser')).subscribe((data: any) => {
      if (data.status === 200) {
        this.realtorUser = data.body;
        console.log(data.body);
        this.entitiesListService.getBrokerList().subscribe((dataBrokers: any) => {
          if (dataBrokers.status === 200) {
            dataBrokers.body.forEach((item) => this.brokers.push(new BrokerCompany(item.noOrder, item.brokerName)));
            if (this.realtorUser.noOrderBroker != null) {
              this.brokerSelected = this.brokers[this.realtorUser.noOrderBroker];
            }
            this.entitiesListService.getCloserList().subscribe((dataClosers: any) => {
              dataClosers.body.forEach((item) => this.closers.push(new CloserCompany(item.noOrder, item.closerName)));
              if (this.realtorUser.noOrderCloser != null) {
                this.closerCompanySelected = this.closers[this.realtorUser.noOrderCloser];
              }
            });
          }
        });
      }
    });
  }

  updateRealtor() {
    this.error = '';
    if (this.updateRealtorDetails.phoneNumber !== undefined) {
      this.validatePhone(this.updateRealtorDetails.phoneNumber);
    }
    if (this.updateRealtorDetails.brokerEmail !== undefined) {
      this.validateEmail(this.updateRealtorDetails.brokerEmail);
    }
    if (this.updateRealtorDetails.brokerPhoneNumber !== undefined) {
      this.validatePhone(this.updateRealtorDetails.brokerPhoneNumber);
    }
    if (this.updateRealtorDetails.closerEmail !== undefined) {
      this.validateEmail(this.updateRealtorDetails.closerEmail);
    }
    if (this.updateRealtorDetails.closerPhoneNumber !== undefined) {
      this.validatePhone(this.updateRealtorDetails.closerPhoneNumber);
    }
    if (this.error !== '') {
      return;
    }

    this.updateRealtorDetails.brokerName = this.brokerSelected.brokerName;
    this.updateRealtorDetails.closerCompany = this.closerCompanySelected.closerCompanyName;
    if (this.updateRealtorDetails.closerCompany !== 'Select one' && this.updateRealtorDetails.brokerName !== 'Select one') {
      return this.realtorUserService.updateRealtorUser(this.updateRealtorDetails).subscribe((data: any) => {
        if (data.status === 200) {
          this.router.navigate(['/dashboard']);
        }
      });
    } else {
      this.updateRealtorDetails.closerCompany = null;
      this.updateRealtorDetails.brokerName = null;
      return this.realtorUserService.updateRealtorUser(this.updateRealtorDetails).subscribe((data: any) => {
        if (data.status === 200) {
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }


  validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexEmail.test(email) === false) {
      this.error = 'Invalid Email';
      return;
    }

  }

  validatePhone(phone) {
    const regexPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (regexPhone.test(phone) === false) {
      this.error = 'Invalid Phone Number';
      return;
    }
  }
}
