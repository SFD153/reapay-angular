import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DetailsComponent} from './components/details/details.component';
import {TransferComponent} from './components/transfer/transfer.component';
import {FundsComponent} from './components/funds/funds.component';
import {TransferViewComponent} from './components/transfer-view-realtor/transfer-view.component';
import {UpdateDetailsComponent} from './components/update-details/update-details.component';
import {TransferViewBrokerComponent} from './components/transfer-view-broker/transfer-view-broker.component';
import {ConfirmRealtorComponent} from './components/confirm-realtor/confirm-realtor.component';
import {ConfirmBrokerComponent} from './components/confirm-broker/confirm-broker.component';
import {ConfirmCloserComponent} from './components/confirm-closer/confirm-closer.component';
import {ConfirmTransactionRealtorComponent} from './components/confirm-transaction-realtor/confirm-transaction-realtor.component';
import {ConfirmTransactionBrokerComponent} from './components/confirm-transaction-broker/confirm-transaction-broker.component';
import {TransferViewCloserComponent} from './components/transfer-view-closer/transfer-view-closer.component';
import {ConfirmTransactionCloserComponent} from './components/confirm-transaction-closer/confirm-transaction-closer.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'transfer-view-realtor/:transactionId', component: TransferViewComponent },
  { path: 'funds', component: FundsComponent },
  { path: 'update-details', component: UpdateDetailsComponent},
  { path: 'transfer-view-broker/:transactionId', component: TransferViewBrokerComponent},
  { path: 'transfer-view-closer/:transactionId', component: TransferViewCloserComponent},
  { path: 'confirm-realtor/:realtorId', component: ConfirmRealtorComponent},
  { path: 'confirm-broker/:brokerId', component: ConfirmBrokerComponent},
  { path: 'confirm-closer/:closerId', component: ConfirmCloserComponent},
  { path: 'confirm-transaction-realtor/:transactionId', component: ConfirmTransactionRealtorComponent},
  { path: 'confirm-transaction-broker/:transactionId', component: ConfirmTransactionBrokerComponent},
  { path: 'confirm-transaction-closer/:transactionId', component: ConfirmTransactionCloserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
