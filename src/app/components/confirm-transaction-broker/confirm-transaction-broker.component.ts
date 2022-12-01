import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {BrokerUserService} from '../../services/brokerUser.service';

@Component({
  selector: 'app-confirm-transaction-broker',
  templateUrl: './confirm-transaction-broker.component.html',
  styleUrls: ['./confirm-transaction-broker.component.css']
})
export class ConfirmTransactionBrokerComponent implements OnInit {

  transactionId: string;
  continue: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private brokerUserService: BrokerUserService,
              @Inject(LOCAL_STORAGE) private localStorage: WebStorageService) {
    this.transactionId = this.route.snapshot.paramMap.get('transactionId');
  }

  ngOnInit() {
    this.brokerUserService.transactionApproval(this.transactionId).subscribe((data: any) => {
      if (data.status === 200) {
        this.continue = true;
        setTimeout(() => {
          this.redirectHome();
        }, 5000);
      }
    });
  }

  redirectHome() {
    this.router.navigate(['/home']);
  }
}
