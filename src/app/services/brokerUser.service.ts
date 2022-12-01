import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {RealtorUserResponse} from '../models/realtor/RealtorUserResponse';
import {catchError} from 'rxjs/operators';
import {RealtorClosingTransactionResponse} from '../models/transaction/RealtorClosingTransactionResponse';
import {RealtorAllTransactionsResponse} from '../models/transaction/RealtorAllTransactionsResponse';
import {BrokerUserResponse} from '../models/broker/BrokerUserResponse';

@Injectable({
  providedIn: 'root'
})
export class BrokerUserService {

  // readonly apiUrl: string = 'http://localhost:8080/v1/user/broker';
  readonly apiUrl: string = 'http://3.135.244.253:8080/v1/user/broker';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getBrokerUser(brokerEmail): Observable<HttpResponse<BrokerUserResponse>> {
    return this.http.get<BrokerUserResponse>(this.apiUrl + '?brokerEmail=' + brokerEmail, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  getBrokerTransaction(transactionId): Observable<HttpResponse<RealtorClosingTransactionResponse>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<RealtorClosingTransactionResponse>(this.apiUrl + '/transaction?transactionId=' + transactionId, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  getBrokerTransactionList(brokerEmail): Observable<HttpResponse<RealtorAllTransactionsResponse>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<RealtorAllTransactionsResponse>(this.apiUrl + '/all-transactions?brokerEmail=' + brokerEmail, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  sendTransactionApprovalVerification(transactionVerification): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrl + '/send-transaction-approval', transactionVerification, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  transactionApproval(transactionId): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrl + '/transaction-approve?transactionId=' + transactionId, null, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  confirmBrokerEmail(brokerUserId): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrl + '/email-validation?brokerUserId=' + brokerUserId, null, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error !== '502') {
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
