import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RealtorUserService} from '../../services/realtorUser.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {RealtorClosingTransactionResponse} from '../../models/transaction/RealtorClosingTransactionResponse';
import {RealtorUserResponse} from '../../models/realtor/RealtorUserResponse';
import {RealtorTransactionDetailsResponse} from '../../models/transaction/RealtorTransactionDetailsResponse';
import {RealtorDisbursementResponse} from '../../models/transaction/RealtorDisbursementResponse';
import {BrokerDisbursementResponse} from '../../models/transaction/BrokerDisbursementResponse';

@Component({
  selector: 'app-transfer-view',
  templateUrl: './transfer-view.component.html',
  styleUrls: ['./transfer-view.component.css']
})
export class TransferViewComponent implements OnInit{

  transactionId: string;
  transaction: RealtorClosingTransactionResponse;
  currentUser: RealtorUserResponse;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private realtorUserService: RealtorUserService,
              @Inject(LOCAL_STORAGE) private localStorage: WebStorageService) {
    this.transactionId = this.route.snapshot.paramMap.get('transactionId');
    this.currentUser = new RealtorUserResponse();
    this.transaction = new RealtorClosingTransactionResponse();
    this.transaction.realtorDisbursementList = new Array<RealtorDisbursementResponse>();
    this.transaction.brokerDisbursementList = new Array<BrokerDisbursementResponse>();
    this.transaction.transactionDetails = new RealtorTransactionDetailsResponse();
  }

  ngOnInit() {
    this.realtorUserService.getRealtorUser(this.localStorage.get('currentUser')).subscribe((data: any) => {
      if (data.status === 200) {
        this.currentUser = data.body;
        this.realtorUserService.getRealtorTransaction(this.transactionId).subscribe((dataTransaction: any) => {
          if (dataTransaction.status === 200) {
            this.transaction = dataTransaction.body;
            this.transaction.realtorDisbursementList = dataTransaction.body.realtorDisbursementList;
            this.transaction.brokerDisbursementList = dataTransaction.body.brokerDisbursementList;
            this.transaction.transactionDetails = dataTransaction.body.transactionDetails;
          }
        });
      }
    });
  }
}
