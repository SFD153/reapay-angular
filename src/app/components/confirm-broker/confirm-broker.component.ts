import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {BrokerUserService} from '../../services/brokerUser.service';

@Component({
  selector: 'app-confirm-broker',
  templateUrl: './confirm-broker.component.html',
  styleUrls: ['./confirm-broker.component.css']
})
export class ConfirmBrokerComponent implements OnInit {

  brokerId: string;
  continue: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private brokerUserService: BrokerUserService,
              @Inject(LOCAL_STORAGE) private localStorage: WebStorageService) {
    this.brokerId = this.route.snapshot.paramMap.get('brokerId');
    this.continue = false;
  }

  ngOnInit() {
    this.brokerUserService.confirmBrokerEmail(this.brokerId).subscribe((data: any) => {
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
