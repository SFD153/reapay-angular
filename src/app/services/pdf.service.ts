import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  // readonly apiUrl: string = 'http://localhost:8080/v1/pdf';
  readonly apiUrl: string = 'http://3.135.244.253:8080/v1/pdf';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  savePdf(transactionId): Observable<HttpResponse<object>> {
    return this.http.post<object>(this.apiUrl + '/save?transactionId=' + transactionId, null, {observe: 'response'})
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
