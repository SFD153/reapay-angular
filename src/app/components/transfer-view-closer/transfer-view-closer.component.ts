import {Component, Inject, OnInit} from '@angular/core';
import {RealtorClosingTransactionResponse} from '../../models/transaction/RealtorClosingTransactionResponse';
import {RealtorUserResponse} from '../../models/realtor/RealtorUserResponse';
import {ActivatedRoute, Router} from '@angular/router';
import {RealtorUserService} from '../../services/realtorUser.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {CloserUserService} from '../../services/closerUser.service';
import {RealtorDisbursementResponse} from '../../models/transaction/RealtorDisbursementResponse';
import {BrokerDisbursementResponse} from '../../models/transaction/BrokerDisbursementResponse';
import {RealtorTransactionDetailsResponse} from '../../models/transaction/RealtorTransactionDetailsResponse';
import {TransactionTextCloser} from '../../models/closer/transactionTextCloser';
import {CloserTransactionVerificationClosing} from '../../models/transaction/CloserTransactionVerificationClosing';
import {PdfService} from '../../services/pdf.service';

@Component({
  selector: 'app-transfer-view-closer',
  templateUrl: './transfer-view-closer.component.html',
  styleUrls: ['./transfer-view-closer.component.css']
})
export class TransferViewCloserComponent implements OnInit {

  transactionId: string;
  transactionText: TransactionTextCloser;
  transaction: RealtorClosingTransactionResponse;
  realtorUser: RealtorUserResponse;
  checked: string;
  error: string;
  url: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private closerUserService: CloserUserService,
              private realtorUserService: RealtorUserService,
              private pdfService: PdfService,
              @Inject(LOCAL_STORAGE) private localStorage: WebStorageService) {
    this.url = '#';
    this.transactionId = this.route.snapshot.paramMap.get('transactionId');
    this.realtorUser = new RealtorUserResponse();
    this.transaction = new RealtorClosingTransactionResponse();
    this.transactionText = new TransactionTextCloser();
    this.transaction.realtorDisbursementList = new Array<RealtorDisbursementResponse>();
    this.transaction.brokerDisbursementList = new Array<BrokerDisbursementResponse>();
    this.transaction.transactionDetails = new RealtorTransactionDetailsResponse();


  }

  ngOnInit() {
    this.closerUserService.getCloserTransaction(this.transactionId).subscribe((data: any) => {
      if (data.status === 200) {
        this.transaction = data.body;
        this.transaction.realtorDisbursementList = data.body.realtorDisbursementList;
        this.transaction.brokerDisbursementList = data.body.brokerDisbursementList;
        this.transaction.transactionDetails = data.body.transactionDetails;
        this.realtorUserService.getRealtorUser(this.transaction.realtorEmail).subscribe((dataUser: any) => {
          if (dataUser.status === 200) {
            this.realtorUser = dataUser.body;
            this.closerUserService.transactionText(this.transactionId).subscribe((dataText: any) => {
              if (dataText.status === 200) {
                if (!!this.transaction.folder && !!this.transaction.pdfName) {
                  this.url = 'https://d18rvw7f4qe4j0.cloudfront.net/' + this.transaction.folder + '/' + this.transaction.pdfName;
                  console.log(this.url);
                }
                this.transactionText = dataText.body;
              }
            });
          }
        });
      }
    });


  }

  closing() {
    this.closerUserService.sendTransactionClosingVerification(new CloserTransactionVerificationClosing(
      this.transaction.closerEmail, this.transaction.transactionId)).subscribe((data: any) => {
        if (data.status === 200) {
          this.router.navigate(['/dashboard']);
        }
      });

  }

  downloadPDF() {
    console.log(this.transaction.folder);
    this.pdfService.savePdf(this.transaction.transactionId).subscribe((data: any) => {
      if (data.status === 200) {
        setTimeout(() => {
          this.url = 'https://d18rvw7f4qe4j0.cloudfront.net/pdf/PdfTransactionResult' + this.transaction.transactionId + '.pdf';
        }, 3000);
      }
    });

  }
}
