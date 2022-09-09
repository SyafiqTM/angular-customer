import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Customer } from '../customer';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer = "http://localhost:5000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient,private datePipe: DatePipe) { }

  create(customer: Customer): Observable<Customer> {
    const date = new Date();
    let stringDate = date.toISOString();
    customer.created = this.datePipe.transform(new Date(stringDate), 'yyyy-MM-dd');
    customer.updated = null;
    return this.httpClient.post<Customer>(this.apiServer + '/customers/', customer, this.httpOptions);
  }

  getCustomerById(id:number): Observable<Customer> {
    return this.httpClient.get<Customer>(this.apiServer + '/customers/' + id);
  }

  getAll(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.apiServer + '/customers/');
  }

  update(customer: Customer): Observable<Customer> {
    const date = new Date();
    let stringDate = date.toISOString();
    customer.updated = this.datePipe.transform(new Date(stringDate), 'yyyy-MM-dd');
    return this.httpClient.put<Customer>(this.apiServer + '/customers/' + customer.id, customer, this.httpOptions)
  }

  delete(customer: Customer): Observable<Customer> {
    return this.httpClient.delete<Customer>(this.apiServer + '/customers/' + customer.id)
  }

}
