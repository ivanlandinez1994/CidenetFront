import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {

  }

  get<T = any>(endpoint: string, options?: Object): Observable<T> {
    return this.http.get<T>(`${endpoint}`, options);
  }

  post<T = any>(endpoint: string, data: any, options?: Object): Observable<T> {
    return this.http.post<T>(`${endpoint}`, data, options);
  }

  put<T = any>(endpoint: string, data: any, options?: Object): Observable<T> {
    return this.http.put<T>(`${endpoint}`, data, options);
  }

  delete<T = any>(endpoint: string, data?: any): any {
    return this.http.delete<T>(`${endpoint}`, data);
  }

  handleError(error: any) {
    return throwError('there was an error while calling api ' + JSON.stringify(error));
  }
}
