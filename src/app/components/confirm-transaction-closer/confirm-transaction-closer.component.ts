import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {CloserUserService} from '../../services/closerUser.service';

@Component({
  selector: 'app-confirm-transaction-closer',
  templateUrl: './confirm-transaction-closer.component.html',
  styleUrls: ['./confirm-transaction-closer.component.css']
})
export class ConfirmTransactionCloserComponent implements OnInit {

  transactionId: string;
  continue: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private closerUserService: CloserUserService,
              @Inject(LOCAL_STORAGE) private localStorage: WebStorageService) {
    this.transactionId = this.route.snapshot.paramMap.get('transactionId');
  }

  ngOnInit() {
    this.closerUserService.transactionClosing(this.transactionId).subscribe((data: any) => {
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
