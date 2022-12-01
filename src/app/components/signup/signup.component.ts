import {Component, Inject, Input, OnInit} from '@angular/core';
import {CreateRealtorUserDetails} from '../../models/realtor/CreateRealtorUserDetails';
import {Router} from '@angular/router';
import {AccountService} from '../../services/account.service';
import {EntitiesListService} from '../../services/entitiesList.service';
import {BrokerCompany} from '../../models/staticEntities/BrokerCompany';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {UserType} from '../../models/UserType';
import {CreateBrokerUserDetails} from '../../models/broker/CreateBrokerUserDetails';
import {CreateCloserUserDetails} from '../../models/closer/CreateCloserUserDetails';
import {CloserCompany} from '../../models/staticEntities/CloserCompany';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Input() createRealtorUserDetails: CreateRealtorUserDetails;
  @Input() createBrokerUserDetails: CreateBrokerUserDetails;
  @Input() createCloserUserDetails: CreateCloserUserDetails;
  error = '';
  roleText = '[Select role]';
  alertLicense = 'This portal is for Licensed Real Estate Agents. ' +
    'I affirm and certify that all the information and answers to questions herein are complete, ' +
    'true and correct to the best of my knowledge and belief. I understand that any misrepresentation, falsification, ' +
    'or omission of any facts called for will be cause for termination of service, whenever discovered.';
  brokerSelected: BrokerCompany;
  brokers: Array<BrokerCompany>;
  closerCompanySelected: CloserCompany;
  closers: Array<CloserCompany>;
  userTypeSelected: UserType;
  userTypes: Array<UserType>;

  constructor(private router: Router,
              private loginService: AccountService,
              private entitiesListService: EntitiesListService,
              @Inject(LOCAL_STORAGE) private localStorage: WebStorageService) {
    this.createRealtorUserDetails = new CreateRealtorUserDetails();
    this.createBrokerUserDetails = new CreateBrokerUserDetails();
    this.createCloserUserDetails = new CreateCloserUserDetails();
    this.userTypes = new Array<UserType>();
    this.userTypes.push(new UserType(-1, 'Select role'));
    this.userTypes.push(new UserType(1, 'REALTOR'));
    this.userTypes.push(new UserType(2, 'BROKER'));
    this.userTypes.push(new UserType(3, 'CLOSER'));
    this.userTypeSelected = this.userTypes[0];
    this.brokers = new Array<BrokerCompany>();
    this.brokers.push(new BrokerCompany(-1, 'Select one'));
    this.brokerSelected = this.brokers[0];
    this.closers = new Array<CloserCompany>();
    this.closers.push(new CloserCompany(-1, 'Select one'));
    this.closerCompanySelected = this.closers[0];
  }


  ngOnInit() {
    this.entitiesListService.getBrokerList().subscribe((dataBrokerCompanies: any) => {
      if (dataBrokerCompanies.status === 200) {
        dataBrokerCompanies.body.forEach((item) => this.brokers.push(new BrokerCompany(item.noOrder, item.brokerName)));
        this.entitiesListService.getCloserList().subscribe((dataCloserCompanies: any) => {
          if (dataCloserCompanies.status === 200) {
            dataCloserCompanies.body.forEach((item) => this.closers.push(new CloserCompany(item.noOrder, item.closerName)));
          }
        });
      }
    });
  }

  register() {
    switch (this.userTypeSelected.roleType) {
      case 'REALTOR': {
        this.error = '';
        this.roleText = '';
        this.registerUserRealtor();
        break;
      }
      case 'BROKER': {
        this.error = '';
        this.roleText = '';
        this.registerUserBroker();
        break;
      }
      case 'CLOSER': {
        this.error = '';
        this.roleText = '';
        this.registerUserCloser();
        break;
      }
      default: {
        this.error = 'Select your user role';
        break;
      }
    }
  }

  registerUserRealtor() {
    this.error = '';
    this.validateEmail(this.createRealtorUserDetails.email);
    this.validatePhone(this.createRealtorUserDetails.phoneNumber);
    this.validatePassword(this.createRealtorUserDetails.password);
    if (this.error !== '') {
      return;
    }

    this.createRealtorUserDetails.brokerName = this.brokerSelected.brokerName;
    if (this.createRealtorUserDetails.brokerName !== 'Select one') {
      return this.loginService.registerUserRealtor(this.createRealtorUserDetails).subscribe((data: any) => {
          if (data.status === 200) {
            this.localStorage.set('currentUser', this.createRealtorUserDetails.email);
            this.localStorage.set('login', true);
            this.localStorage.set('userType', this.userTypeSelected.roleType);
            alert(this.alertLicense);
            this.router.navigate(['/dashboard']);
          }
        }
        , error => {
          this.error = 'Email used or invalid fields';
          this.createRealtorUserDetails = new CreateRealtorUserDetails();
        });
    } else {
      this.error = 'Please select a broker';
    }
  }

  registerUserBroker() {
    this.error = '';
    this.validateEmail(this.createBrokerUserDetails.email);
    this.validatePhone(this.createBrokerUserDetails.phoneNumber);
    this.validatePassword(this.createBrokerUserDetails.password);
    if (this.error !== '') {
      return;
    }

    this.createBrokerUserDetails.brokerCompanyName = this.brokerSelected.brokerName;
    if (this.createBrokerUserDetails.brokerCompanyName !== 'Select one') {
      return this.loginService.registerUserBroker(this.createBrokerUserDetails).subscribe((data: any) => {
          if (data.status === 200) {
            this.localStorage.set('currentUser', this.createBrokerUserDetails.email);
            this.localStorage.set('login', true);
            this.localStorage.set('userType', this.userTypeSelected.roleType);
            alert(this.alertLicense);
            this.router.navigate(['/dashboard']);
          }
        }
        , error => {
          this.error = 'Email used or invalid fields';
          this.createBrokerUserDetails = new CreateBrokerUserDetails();
        });
    } else {
      this.error = 'Please select a broker';
    }
  }

  registerUserCloser() {
    this.error = '';
    this.validateEmail(this.createCloserUserDetails.email);
    this.validatePhone(this.createCloserUserDetails.phoneNumber);
    this.validatePassword(this.createCloserUserDetails.password);
    if (this.error !== '') {
      return;
    }

    this.createCloserUserDetails.closerCompanyName = this.closerCompanySelected.closerCompanyName;
    if (this.createCloserUserDetails.closerCompanyName !== 'Select one') {
      return this.loginService.registerUserCloser(this.createCloserUserDetails).subscribe((data: any) => {
          if (data.status === 200) {
            this.localStorage.set('currentUser', this.createCloserUserDetails.email);
            this.localStorage.set('login', true);
            this.localStorage.set('userType', this.userTypeSelected.roleType);
            alert(this.alertLicense);
            this.router.navigate(['/dashboard']);
          }
        }
        , error => {
          this.error = 'Email used or invalid fields';
          this.createCloserUserDetails = new CreateCloserUserDetails();
        });
    } else {
      this.error = 'Please select a broker';
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

  validatePassword(password) {
    const regexPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/;
    if (regexPassword.test(password) === false) {
      this.error = 'Password must contain at least 8 characters in length, lower case, upper case, numbers, special characters';
      return;
    }
  }
}

