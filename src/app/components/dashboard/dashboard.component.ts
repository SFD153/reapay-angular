import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {RealtorUserService} from '../../services/realtorUser.service';
import {RealtorUserResponse} from '../../models/realtor/RealtorUserResponse';
import {RealtorClosingTransactionResponse} from '../../models/transaction/RealtorClosingTransactionResponse';
import {BrokerUserResponse} from '../../models/broker/BrokerUserResponse';
import {UserType} from '../../models/UserType';
import {BrokerUserService} from '../../services/brokerUser.service';
import {CloserUserResponse} from '../../models/closer/CloserUserResponse';
import {CloserUserService} from '../../services/closerUser.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userType: UserType;
  currentRealtorUser: RealtorUserResponse;
  currentBrokerUser: BrokerUserResponse;
  currentCloserUser: CloserUserResponse;
  currentUserEmail: string;
  transactionList: Array<RealtorClosingTransactionResponse>;
  canCreateTransaction: boolean;

  constructor(private router: Router,
              private realtorUserService: RealtorUserService,
              private brokerUserService: BrokerUserService,
              private closerUserService: CloserUserService,
              @Inject(LOCAL_STORAGE) private localStorage: WebStorageService) {
    this.canCreateTransaction = false;
    this.currentRealtorUser = new RealtorUserResponse();
    this.currentBrokerUser = new BrokerUserResponse();
    this.currentCloserUser = new CloserUserResponse();
    this.userType = new UserType(0, this.localStorage.get('userType'));
    this.currentUserEmail = this.localStorage.get('currentUser');
  }

  ngOnInit() {
    switch (this.userType.roleType) {
      case 'REALTOR': {
        this.loadRealtorUserDetails();
        break;
      }
      case 'BROKER': {
        this.loadBrokerUserDetails();
        break;
      }
      case 'CLOSER': {
        this.loadCloserUserDetails();
        break;
      }
      default: {
        break;
      }
    }
  }

  loadRealtorUserDetails() {
    this.currentRealtorUser.errorMessage = '';
    this.realtorUserService.getRealtorUser(this.currentUserEmail).subscribe((data: any) => {
      if (data.status === 200) {
        this.currentRealtorUser = data.body;
        if (this.brokerRequired() && this.closerRequired()) {
          this.canCreateTransaction = true;
        }
        this.realtorUserService.getRealtorTransactionList(this.currentUserEmail).subscribe((dataTransactions: any) => {
          if (dataTransactions.status === 200) {
            this.transactionList = dataTransactions.body.transactions;
          }
        });
      }
    });
  }

  loadBrokerUserDetails() {
    this.currentBrokerUser.errorMessage = '';
    this.brokerUserService.getBrokerUser(this.currentUserEmail).subscribe((data: any) => {
      if (data.status === 200) {
        this.currentBrokerUser = data.body;
        this.brokerUserService.getBrokerTransactionList(this.currentUserEmail).subscribe((dataTransactions: any) => {
          if (dataTransactions.status === 200) {
            this.transactionList = dataTransactions.body.transactions;
          }
        });
      }
    });
  }

  loadCloserUserDetails() {
    this.currentCloserUser.errorMessage = '';
    this.closerUserService.getCloserUser(this.currentUserEmail).subscribe((data: any) => {
      if (data.status === 200) {
        this.currentCloserUser = data.body;
        this.closerUserService.getCloserTransactionList(this.currentUserEmail).subscribe((dataTransactions: any) => {
          if (dataTransactions.status === 200) {
            this.transactionList = dataTransactions.body.transactions;
          }
        });
      }
    });

  }

  brokerRequired() {
    if (this.currentRealtorUser.brokerName !== null && this.currentRealtorUser.brokerPhoneNumber !== null
      && this.currentRealtorUser.brokerEmail !== null && this.currentRealtorUser.managingBroker !== null) {
      return true;
    }
    return false;
  }

  closerRequired() {
    if (this.currentRealtorUser.closerCompany !== null && this.currentRealtorUser.closerPhoneNumber !== null
      && this.currentRealtorUser.closerEmail !== null && this.currentRealtorUser.closerName !== null) {
      return true;
    }
    return false;
  }

  logout() {
    this.localStorage.clear();
    this.router.navigate(['/home']);
  }

  updateDetailsRealtorUser() {
    this.router.navigate(['/update-details']);
  }

  viewTransactionAsBroker(transactionId) {
    this.router.navigate(['/transfer-view-broker/' + transactionId]);
  }

  viewTransactionAsCloser(transactionId) {
    this.router.navigate(['/transfer-view-closer/' + transactionId]);
  }
}
