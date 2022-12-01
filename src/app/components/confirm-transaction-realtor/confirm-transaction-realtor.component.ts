import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {RealtorUserService} from '../../services/realtorUser.service';

@Component({
  selector: 'app-confirm-transaction-realtor',
  templateUrl: './confirm-transaction-realtor.component.html',
  styleUrls: ['./confirm-transaction-realtor.component.css']
})
export class ConfirmTransactionRealtorComponent implements OnInit {

  transactionId: string;
  continue: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private realtorUserService: RealtorUserService,
              @Inject(LOCAL_STORAGE) private localStorage: WebStorageService) {
    this.transactionId = this.route.snapshot.paramMap.get('transactionId');
    this.continue = false;
  }

  ngOnInit() {
    this.realtorUserService.confirmTransactionRealtor(this.transactionId).subscribe((data: any) => {
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
