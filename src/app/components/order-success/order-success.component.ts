import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/service/bookService/book-service.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})

export class OrderSuccessComponent implements OnInit {
  books: Array<any> = [];
  
  constructor(private bookService: BookService,public router: Router) { }

  ngOnInit(): void {
    this.cartItems();
  }

  cartItems() {
    this.bookService.cartItems().subscribe((res) => {
      console.log('cartItems', res);
      this.books = res['result'];
      console.log('books array', this.books);
    });
  }

  navigateBook() {
    this.router.navigate(['dashboard'])
  }
}