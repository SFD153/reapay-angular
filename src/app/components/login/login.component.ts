import {Component, Inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {LoginDetails} from '../../models/LoginDetails';
import {AccountService} from '../../services/account.service';
import {UserType} from '../../models/UserType';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() loginDetails: LoginDetails;
  invalidUser = '';
  error = '';
  roleText = '[Select role]';
  userTypeSelected: UserType;
  userTypes: Array<UserType>;

  constructor(private router: Router,
              @Inject(LOCAL_STORAGE) private localStorage: WebStorageService,
              private loginService: AccountService) {
    if (this.localStorage.get('login') === true) {
      this.router.navigate(['/dashboard']);
    }
    this.loginDetails = new LoginDetails();
    this.userTypes = new Array<UserType>();
    this.userTypes.push(new UserType(-1, 'Select role'));
    this.userTypes.push(new UserType(1, 'REALTOR'));
    this.userTypes.push(new UserType(2, 'BROKER'));
    this.userTypes.push(new UserType(3, 'CLOSER'));
    this.userTypeSelected = this.userTypes[0];

  }

  login() {
    switch (this.userTypeSelected.roleType) {
      case 'REALTOR': {
        this.error = '';
        this.roleText = '';
        this.loginUserRealtor();
        break;
      }
      case 'BROKER': {
        this.error = '';
        this.roleText = '';
        this.loginUserBroker();
        break;
      }
      case 'CLOSER': {
        this.error = '';
        this.roleText = '';
        this.loginUserCloser();
        break;
      }
      default: {
        this.error = 'Select your user role';
        break;
      }
    }
  }

  loginUserRealtor() {
    return this.loginService.loginUserRealtor(this.loginDetails).subscribe((data: any) => {
        if (data.status === 200) {
          this.localStorage.set('currentUser', this.loginDetails.email);
          this.localStorage.set('login', true);
          this.localStorage.set('userType', this.userTypeSelected.roleType);
          this.router.navigate(['/dashboard']);
        }
      }
      , error => {
        this.invalidUser = 'Invalid user or password';
        this.loginDetails = new LoginDetails();
      });
  }

  loginUserBroker() {
    return this.loginService.loginUserBroker(this.loginDetails).subscribe((data: any) => {
        if (data.status === 200) {
          this.localStorage.set('currentUser', this.loginDetails.email);
          this.localStorage.set('login', true);
          this.localStorage.set('userType', this.userTypeSelected.roleType);
          this.router.navigate(['/dashboard']);
        }
      }
      , error => {
        this.invalidUser = 'Invalid user or password';
        this.loginDetails = new LoginDetails();
      });
  }

  loginUserCloser() {
    return this.loginService.loginUserCloser(this.loginDetails).subscribe((data: any) => {
        if (data.status === 200) {
          this.localStorage.set('currentUser', this.loginDetails.email);
          this.localStorage.set('login', true);
          this.localStorage.set('userType', this.userTypeSelected.roleType);
          this.router.navigate(['/dashboard']);
        }
      }
      , error => {
        this.invalidUser = 'Invalid user or password';
        this.loginDetails = new LoginDetails();
      });
  }
}

