import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {BrokerCompany} from '../models/staticEntities/BrokerCompany';
import {catchError} from 'rxjs/operators';
import {CreateRealtorTransactionRequest} from '../models/transaction/CreateRealtorTransactionRequest';
import {UpdateRealtorUserDetails} from '../models/realtor/UpdateRealtorUserDetails';
import {RealtorUserResponse} from '../models/realtor/RealtorUserResponse';
import {RealtorAllTransactionsResponse} from '../models/transaction/RealtorAllTransactionsResponse';
import {RealtorClosingTransactionResponse} from '../models/transaction/RealtorClosingTransactionResponse';

@Injectable({
  providedIn: 'root'
})
export class RealtorUserService {

  // readonly apiUrl: string = 'http://localhost:8080/v1/user/realtor';
  readonly apiUrl: string = 'http://3.135.244.253:8080/v1/user/realtor';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getRealtorUser(realtorEmail): Observable<HttpResponse<RealtorUserResponse>> {
    return this.http.get<RealtorUserResponse>(this.apiUrl + '?realtorEmail=' + realtorEmail, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateRealtorUser(updateRealtorUserDetails: UpdateRealtorUserDetails): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrl + '/update-details', updateRealtorUserDetails, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  confirmRealtorEmail(realtorUserId): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrl + '/email-validation?realtorUserId=' + realtorUserId, null, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  getRealtorTransaction(transactionId): Observable<HttpResponse<RealtorClosingTransactionResponse>> {
    return this.http.get<RealtorClosingTransactionResponse>(this.apiUrl + '/transaction?transactionId=' + transactionId, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  getRealtorTransactionList(realtorEmail): Observable<HttpResponse<RealtorAllTransactionsResponse>> {
    return this.http.get<RealtorAllTransactionsResponse>(this.apiUrl + '/all-transactions?realtorEmail=' + realtorEmail, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  createRealtorTransaction(createRealtorTransactionDetails: CreateRealtorTransactionRequest): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrl + '/transaction', createRealtorTransactionDetails, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  confirmTransactionRealtor(transactionId): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrl + '/confirm-transaction?transactionId=' + transactionId, null, {observe: 'response'})
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
