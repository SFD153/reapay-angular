import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsComponent } from './components/details/details.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { FundsComponent } from './components/funds/funds.component';
import { TransferViewComponent } from './components/transfer-view-realtor/transfer-view.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateDetailsComponent } from './components/update-details/update-details.component';
import { TransferViewBrokerComponent } from './components/transfer-view-broker/transfer-view-broker.component';
import { ConfirmRealtorComponent } from './components/confirm-realtor/confirm-realtor.component';
import { ConfirmBrokerComponent } from './components/confirm-broker/confirm-broker.component';
import { ConfirmCloserComponent } from './components/confirm-closer/confirm-closer.component';
import { ConfirmTransactionRealtorComponent } from './components/confirm-transaction-realtor/confirm-transaction-realtor.component';
import { ConfirmTransactionBrokerComponent } from './components/confirm-transaction-broker/confirm-transaction-broker.component';
import { TransferViewCloserComponent } from './components/transfer-view-closer/transfer-view-closer.component';
import { ConfirmTransactionCloserComponent } from './components/confirm-transaction-closer/confirm-transaction-closer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    DetailsComponent,
    TransferComponent,
    FundsComponent,
    TransferViewComponent,
    UpdateDetailsComponent,
    TransferViewBrokerComponent,
    ConfirmRealtorComponent,
    ConfirmBrokerComponent,
    ConfirmCloserComponent,
    ConfirmTransactionRealtorComponent,
    ConfirmTransactionBrokerComponent,
    TransferViewCloserComponent,
    ConfirmTransactionCloserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
