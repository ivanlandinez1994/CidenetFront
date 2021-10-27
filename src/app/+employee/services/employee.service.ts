import { Injectable } from '@angular/core';
import { EmployeeFilter } from '@employee/models/employeeFilter';
import { environment } from '@environments/environment';
import { HttpService } from '@shared/services/http.service';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Employee } from '../models/employee';

const countryUrl = '/country';
const areaUrl = '/area';
const employeeUrl = '/employee';
const ENDPOINT_PREFIX = environment.apiRoot;

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private httpService: HttpService) { }

  bringCountries(): Observable<any> {
    return this.httpService.get(`${ENDPOINT_PREFIX}${countryUrl}`)
      .pipe(retry(1), catchError(this.httpService.handleError));
  }

  bringAreas(): Observable<any> {
    return this.httpService.get(`${ENDPOINT_PREFIX}${areaUrl}`)
      .pipe(retry(1), catchError(this.httpService.handleError));
  }

  saveEmployee(employee: Employee): Observable<any> {
    return this.httpService.post(`${ENDPOINT_PREFIX}${employeeUrl}`, employee)
      .pipe(retry(1), catchError(this.httpService.handleError));
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.httpService.put(`${ENDPOINT_PREFIX}${employeeUrl}`, employee)
      .pipe(retry(1), catchError(this.httpService.handleError));
  }
  
  deleteEmployee(employeeId: string): Observable<any> {
    return this.httpService.delete(`${ENDPOINT_PREFIX}${employeeUrl}?employeeId=${employeeId}`)
      .pipe(retry(1), catchError(this.httpService.handleError));
  }

  bringEmployees(employeeFilter: EmployeeFilter): Observable<any> {
    return this.httpService.post(`${ENDPOINT_PREFIX}${employeeUrl}/listByFilter`, employeeFilter)
      .pipe(retry(1), catchError(this.httpService.handleError));
  }
}
