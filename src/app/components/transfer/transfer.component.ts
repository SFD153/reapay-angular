import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RealtorUserService} from '../../services/realtorUser.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {CreateRealtorTransactionRequest} from '../../models/transaction/CreateRealtorTransactionRequest';
import {RealtorTransactionDetailsRequest} from '../../models/transaction/RealtorTransactionDetailsRequest';
import {RealtorDisbursementRequest} from '../../models/transaction/RealtorDisbursementRequest';
import {BrokerDisbursementRequest} from '../../models/transaction/BrokerDisbursementRequest';
import * as moment from 'moment';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit{

  @Input() transaction: CreateRealtorTransactionRequest;
  realtorDisbursementList: Array<RealtorDisbursementRequest>;
  brokerDisbursementList: Array<BrokerDisbursementRequest>;
  currentUserName: string;
  error: string;

  constructor(private router: Router,
              private realtorUserService: RealtorUserService,
              @Inject(LOCAL_STORAGE) private localStorage: WebStorageService) {
    this.realtorDisbursementList = new Array<RealtorDisbursementRequest>();
    this.brokerDisbursementList = new Array<BrokerDisbursementRequest>();
    this.transaction = new CreateRealtorTransactionRequest();
    this.transaction.transactionDetails = new RealtorTransactionDetailsRequest();
    this.transaction.realtorDisbursementList = new Array<RealtorDisbursementRequest>();
    this.transaction.brokerDisbursementList = new Array<BrokerDisbursementRequest>();
    this.transaction.realtorEmail = this.localStorage.get('currentUser');
  }

  ngOnInit() {
    this.realtorUserService.getRealtorUser(this.localStorage.get('currentUser')).subscribe((data: any) => {
      if (data.status === 200) {
        this.currentUserName = data.body.userName;
        this.realtorDisbursementList.push(new RealtorDisbursementRequest('Commission:', data.body.company, undefined));
        this.brokerDisbursementList.push(new BrokerDisbursementRequest('Commission:', data.body.brokerName, undefined));
        this.brokerDisbursementList.push(new BrokerDisbursementRequest('Admin Fee:', data.body.brokerName, undefined));
      }
    });
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  completeFirstStep() {
    this.transaction.transactionDetails.closingDate = moment(this.transaction.transactionDetails.closingDate).format('MM/DD/YYYY');
    this.transaction.realtorDisbursementList = this.realtorDisbursementList;
    this.transaction.brokerDisbursementList = this.brokerDisbursementList;
    this.checkRequiredInput(this.transaction);
    return this.realtorUserService.createRealtorTransaction(this.transaction).subscribe((data: any) => {
      if (data.status === 200) {
        this.router.navigate(['/transfer-view-realtor/' + data.body.transactionId]);
      }
    });
  }

  addRealtorDisbursement() {
    this.realtorDisbursementList.push(new RealtorDisbursementRequest('Details', 'Receiver', 'Amount'));
  }

  addBrokerDisbursement() {
    this.brokerDisbursementList.push(new BrokerDisbursementRequest('Details', 'Receiver', 'Amount'));

  }

  deleteRealtorDisbursement(index) {
    if (index > -1) {
      this.realtorDisbursementList.splice(index, 1);
    }
  }

  deleteBrokerDisbursement(index) {
    if (index > -1) {
      this.brokerDisbursementList.splice(index, 1);
    }
  }

  checkRequiredInput(inputTransaction: CreateRealtorTransactionRequest) {
    if (!inputTransaction.transactionDetails.mls) {
      this.error = 'MLS field is required';
      throw new Error('invalid MLS');
    }
    if (!inputTransaction.transactionDetails.propertyAddress) {
      this.error = 'Property Address field is required';
      throw new Error('invalid propertyAddress');
    }
    if (!inputTransaction.transactionDetails.closingDate) {
      this.error = 'Closing Date field is required';
      throw new Error('invalid closingDate');
    }
    if (!inputTransaction.transactionDetails.finalPrice) {
      this.error = 'Final Price field is required';
      throw new Error('invalid finalPrice');
    }
    if (!inputTransaction.transactionDetails.realtorIsRepresenting) {
      this.error = 'Realtor Is Representing field is required';
      throw new Error('invalid realtorIsRepresenting');
    }
    inputTransaction.realtorDisbursementList.forEach((realtorDisbursement: RealtorDisbursementRequest) => {
      if (!realtorDisbursement.detailsPayment || realtorDisbursement.detailsPayment === 'Details') {
        this.error = 'Details Payment field is required';
        throw new Error('invalid detailsPayment');
      }
      if (!realtorDisbursement.receiverName || realtorDisbursement.receiverName === 'Receiver') {
        this.error = 'Receiver Name field is required';
        throw new Error('invalid receiverName');
      }
      if (!realtorDisbursement.amount || realtorDisbursement.amount === 'Amount') {
        this.error = 'Amount field is required';
        throw new Error('invalid amount');
      }
    });
    inputTransaction.brokerDisbursementList.forEach((brokerDisbursement: BrokerDisbursementRequest) => {
      if (!brokerDisbursement.detailsPayment || brokerDisbursement.detailsPayment === 'Details') {
        this.error = 'Details Payment field is required';
        throw new Error('invalid detailsPayment');
      }
      if (!brokerDisbursement.receiverName || brokerDisbursement.receiverName === 'Receiver') {
        this.error = 'Receiver Name field is required';
        throw new Error('invalid receiverName');
      }
      if (!brokerDisbursement.amount || brokerDisbursement.amount === 'Amount') {
        this.error = 'Amount field is required';
        throw new Error('invalid amount');
      }
    });
  }
}
