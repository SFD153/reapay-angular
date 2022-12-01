import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {RealtorUserResponse} from '../models/realtor/RealtorUserResponse';
import {catchError} from 'rxjs/operators';
import {RealtorClosingTransactionResponse} from '../models/transaction/RealtorClosingTransactionResponse';
import {RealtorAllTransactionsResponse} from '../models/transaction/RealtorAllTransactionsResponse';
import {CloserUserResponse} from '../models/closer/CloserUserResponse';

@Injectable({
  providedIn: 'root'
})
export class CloserUserService {

  readonly apiUrl: string = 'http://3.135.244.253:8080/v1/user/closer';
  // readonly apiUrl: string = 'http://localhost:8080/v1/user/closer';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getCloserUser(closerEmail): Observable<HttpResponse<CloserUserResponse>> {
    return this.http.get<CloserUserResponse>(this.apiUrl + '?closerEmail=' + closerEmail, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  confirmCloserEmail(closerUserId): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrl + '/email-validation?closerUserId=' + closerUserId, null, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  getCloserTransaction(transactionId): Observable<HttpResponse<RealtorClosingTransactionResponse>> {
    return this.http.get<RealtorClosingTransactionResponse>(this.apiUrl + '/transaction?transactionId=' + transactionId, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  getCloserTransactionList(closerEmail): Observable<HttpResponse<RealtorAllTransactionsResponse>> {
    return this.http.get<RealtorAllTransactionsResponse>(this.apiUrl + '/all-transactions?closerEmail=' + closerEmail, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  sendTransactionClosingVerification(transactionVerification): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrl + '/send-transaction-closing', transactionVerification, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  transactionClosing(transactionId): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrl + '/transaction-closing?transactionId=' + transactionId, null, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  transactionText(transactionId): Observable<HttpResponse<object>> {
    return this.http.get<object>(this.apiUrl + '/transaction-text?transactionId=' + transactionId, {observe: 'response'})
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
