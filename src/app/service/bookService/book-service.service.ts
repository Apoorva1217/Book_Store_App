import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  public data = new BehaviorSubject('');
  change(data: string) {
    this.data.next(data)
  }

  baseurl = environment.baseUrl

  constructor(private httpService: HttpService) { }

  addcart(book: any) {
    return this.httpService.postCart('Cart/AddCart', book);
  }

  decreaseQuantity(product_id: any,quantity) {
    let options =
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    }
    return this.httpService.postCart('Cart/ReduceBookQuantity?productId='+product_id+'&quantityToRemove='+quantity,{})
  }

  increaseQuantity(book) {
    let options =
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    }
    return this.httpService.postCart('Cart/IncreaseBookQuantity',book);
  }

  removeItem(num: string) {
    return this.httpService.postCart('Cart/RemoveCartItem?productId=' + num, {});
  }

  cartItems() {
    return this.httpService.get('Cart/GetCartItems');
  }

  getBook() {
    return this.httpService.get('Product/GetBooks');
  }

  placedOrder(data: any) {
    return this.httpService.post('Order/PlaceOrder', data)
  }

  customerDetails(newUser: any) {
    return this.httpService.post('CustomerDetails/AddCustomerDetails', newUser)
  }
}