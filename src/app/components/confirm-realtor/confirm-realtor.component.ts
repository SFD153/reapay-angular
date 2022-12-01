import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RealtorUserService} from '../../services/realtorUser.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';

@Component({
  selector: 'app-confirm-realtor',
  templateUrl: './confirm-realtor.component.html',
  styleUrls: ['./confirm-realtor.component.css']
})
export class ConfirmRealtorComponent implements OnInit {

  realtorId: string;
  continue: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private realtorUserService: RealtorUserService,
              @Inject(LOCAL_STORAGE) private localStorage: WebStorageService) {
    this.realtorId = this.route.snapshot.paramMap.get('realtorId');
    this.continue = false;
  }

  ngOnInit() {
    this.realtorUserService.confirmRealtorEmail(this.realtorId).subscribe((data: any) => {
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
