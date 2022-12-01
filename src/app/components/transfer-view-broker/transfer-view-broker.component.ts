import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RealtorUserService} from '../../services/realtorUser.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {BrokerUserService} from '../../services/brokerUser.service';
import {RealtorClosingTransactionResponse} from '../../models/transaction/RealtorClosingTransactionResponse';
import {RealtorDisbursementResponse} from '../../models/transaction/RealtorDisbursementResponse';
import {BrokerDisbursementResponse} from '../../models/transaction/BrokerDisbursementResponse';
import {RealtorTransactionDetailsResponse} from '../../models/transaction/RealtorTransactionDetailsResponse';
import {RealtorUserResponse} from '../../models/realtor/RealtorUserResponse';
import {BrokerTransactionVerificationApproval} from '../../models/transaction/BrokerTransactionVerificationApproval';

@Component({
  selector: 'app-transfer-view-broker',
  templateUrl: './transfer-view-broker.component.html',
  styleUrls: ['./transfer-view-broker.component.css']
})
export class TransferViewBrokerComponent implements OnInit {

  transactionId: string;
  transaction: RealtorClosingTransactionResponse;
  realtorUser: RealtorUserResponse;
  checked: string;
  error: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private brokerUserService: BrokerUserService,
              private realtorUserService: RealtorUserService,
              @Inject(LOCAL_STORAGE) private localStorage: WebStorageService) {
    this.transactionId = this.route.snapshot.paramMap.get('transactionId');
    this.realtorUser = new RealtorUserResponse();
    this.transaction = new RealtorClosingTransactionResponse();
    this.transaction.realtorDisbursementList = new Array<RealtorDisbursementResponse>();
    this.transaction.brokerDisbursementList = new Array<BrokerDisbursementResponse>();
    this.transaction.transactionDetails = new RealtorTransactionDetailsResponse();
  }

  ngOnInit() {
    this.brokerUserService.getBrokerTransaction(this.transactionId).subscribe((data: any) => {
      if (data.status === 200) {
        this.transaction = data.body;
        this.transaction.realtorDisbursementList = data.body.realtorDisbursementList;
        this.transaction.brokerDisbursementList = data.body.brokerDisbursementList;
        this.transaction.transactionDetails = data.body.transactionDetails;
        this.realtorUserService.getRealtorUser(this.transaction.realtorEmail).subscribe((dataUser: any) => {
          if (dataUser.status === 200) {
            this.realtorUser = dataUser.body;
          }
        });
      }
    });
  }

  approve() {
    if (this.checked === 'true') {
      this.brokerUserService.sendTransactionApprovalVerification(new BrokerTransactionVerificationApproval(
        this.transaction.brokerEmail, this.transaction.transactionId)).subscribe((data: any) => {
        if (data.status === 200) {
          this.router.navigate(['/dashboard']);
        }
      });
    } else {
      this.error = 'Please check box';
    }
  }
}
