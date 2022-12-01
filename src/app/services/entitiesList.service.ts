import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BrokerCompany} from '../models/staticEntities/BrokerCompany';
import {CloserCompany} from '../models/staticEntities/CloserCompany';

@Injectable({
  providedIn: 'root'
})
export class EntitiesListService {

  readonly apiUrlBrokerList: string = 'http://3.135.244.253:8080/v1/brokers';
  readonly apiUrlCloserList: string = 'http://3.135.244.253:8080/v1/closers';
  // readonly apiUrlBrokerList: string = 'http://localhost:8080/v1/brokers';
  // readonly apiUrlCloserList: string = 'http://localhost:8080/v1/closers';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getBrokerList(): Observable<HttpResponse<Array<BrokerCompany>>> {
    return this.http.get<Array<BrokerCompany>>(this.apiUrlBrokerList + '/all', {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  getCloserList(): Observable<HttpResponse<Array<CloserCompany>>> {
    return this.http.get<Array<CloserCompany>>(this.apiUrlCloserList + '/all', {observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if   (error.error !== '502') {
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
