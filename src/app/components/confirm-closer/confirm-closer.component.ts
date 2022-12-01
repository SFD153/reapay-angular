import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {CloserUserService} from '../../services/closerUser.service';

@Component({
  selector: 'app-confirm-closer',
  templateUrl: './confirm-closer.component.html',
  styleUrls: ['./confirm-closer.component.css']
})
export class ConfirmCloserComponent implements OnInit {

  closerId: string;
  continue: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private closerUserService: CloserUserService,
              @Inject(LOCAL_STORAGE) private localStorage: WebStorageService) {
    this.closerId = this.route.snapshot.paramMap.get('closerId');
    this.continue = false;
  }

  ngOnInit() {
    this.closerUserService.confirmCloserEmail(this.closerId).subscribe((data: any) => {
      if (data.status === 200) {
        console.log("here");
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
