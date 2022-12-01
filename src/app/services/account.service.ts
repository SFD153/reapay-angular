import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LoginDetails} from '../models/LoginDetails';
import {catchError} from 'rxjs/operators';
import {CreateRealtorUserDetails} from '../models/realtor/CreateRealtorUserDetails';
import {CreateBrokerUserDetails} from '../models/broker/CreateBrokerUserDetails';
import {CreateCloserUserDetails} from '../models/closer/CreateCloserUserDetails';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  // readonly apiUrlUserRealtor: string = 'http://3.135.244.253:8080/v1/user/realtor';
  // readonly apiUrlUserBroker: string = 'http://3.135.244.253:8080/v1/user/broker';
  // readonly apiUrlUserCloser: string = 'http://3.135.244.253:8080/v1/user/closer';
  readonly apiUrlUserRealtor: string = 'http://localhost:8080/v1/user/realtor';
  readonly apiUrlUserBroker: string = 'http://localhost:8080/v1/user/broker';
  readonly apiUrlUserCloser: string = 'http://localhost:8080/v1/user/closer';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  loginUserRealtor(loginDetails): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrlUserRealtor + '/login', loginDetails, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  loginUserBroker(loginDetails): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrlUserBroker + '/login', loginDetails, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  loginUserCloser(loginDetails): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrlUserCloser + '/login', loginDetails, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  registerUserRealtor(registerDetails: CreateRealtorUserDetails): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrlUserRealtor + '/register', registerDetails, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  registerUserBroker(registerDetails: CreateBrokerUserDetails): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrlUserBroker + '/register', registerDetails, {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  registerUserCloser(registerDetails: CreateCloserUserDetails): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrlUserCloser + '/register', registerDetails, {observe: 'response'})
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
