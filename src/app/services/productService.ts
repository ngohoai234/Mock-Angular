import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import {
  URL,
  URL_GET_PRODUCT,
  URL_GET_BY_ID,
  URL_GET_BY_CATEGORY,
} from '../common/constants/rootConstants';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  error = new Subject<string>();

  getProducts(): Observable<any> {
    return this.http.get(URL + URL_GET_PRODUCT).pipe(
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }

  getProductById(id: string): Observable<any> {
    const searchParams = new HttpParams().append('id', id);

    return this.http
      .get(URL + URL_GET_BY_ID, {
        params: searchParams,
      })
      .pipe(
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }

  getProductByText(value: any): Observable<any> {
    const url = `https://utc2ranking.azurewebsites.net/api/Product/Search?keysearch=${value}`;
    return this.http.get(url, value).pipe(
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }

  getByCategory(value: string): Observable<any> {
    const searchParams = new HttpParams().append('category', value);

    return this.http
      .get(URL + URL_GET_BY_CATEGORY, {
        params: searchParams,
      })
      .pipe(
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }
}
