import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  baseurl = environment.baseUrl
  token: string;

  constructor(private http: HttpClient) { }

  private messageSource = new BehaviorSubject<any>([]);
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: any) {
    this.messageSource.next(message)
  }

  private messageSource1 = new BehaviorSubject<any>([{}]);
  currentMessage1 = this.messageSource1.asObservable();

  changeCartLength(message: any) {
    this.messageSource1.next(message)
  }

  private messageSource2 = new BehaviorSubject<any>([{}]);
  currentMessage2 = this.messageSource2.asObservable();

  decreaseCartLength(message: any) {
    this.messageSource2.next(message)
  }

  post(url: string, data: any, isHeaderRequired = false, header = null) {
    return this.http.post(this.baseurl + url, data, isHeaderRequired && header)
  }

  postCart(url: string, data: any) {
    this.token = localStorage.getItem('token');
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    }
    this.token = localStorage.getItem('token')
    console.log("getting token ", this.token);
    console.log(" data in http ", data);
    return this.http.post(this.baseurl + url, data, options);
  }

  postQuantity(url: string, product_id: any, quantity: any) {
    this.token = localStorage.getItem('token');
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    }
    this.token = localStorage.getItem('token')
    console.log("getting token ", this.token);
    console.log(" product id: ", product_id);
    console.log("quantity:", quantity);
    return this.http.post(this.baseurl + url, product_id, options);
  }

  get(url: string) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    }
    this.token = localStorage.getItem('token');
    console.log("Getting token ", this.token);
    console.log("options in httpservice ", options);
    return this.http.get(this.baseurl + url, options);
  }
}