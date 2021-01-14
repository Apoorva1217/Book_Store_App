import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/httpService/http-service.service';
import { BookService } from '../../service/bookService/book-service.service';

@Component({
  selector: 'app-get-books',
  templateUrl: './get-books.component.html',
  styleUrls: ['./get-books.component.scss']
})

export class GetbooksComponent implements OnInit {
  static booksArray: any;

  constructor(private bookService: BookService, private router: Router, private httpService:HttpService) { }
  bag: any;
  booksArray: Array<any> = [];
  books:Array<any>=[];

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getBook().subscribe((response) => {
      console.log(response);
      this.booksArray = response['data'];
      console.log(' books array ', this.booksArray);
    });
  };

  addcart(book:any) {
    book.added = false;
    for (let b of this.booksArray) {
      if (book.product_id == b.product_id) {
        book.added = true;
      }
    }
    this.bookService.addcart(book).subscribe((res) => {
      console.log('data in cart', res);
      this.cartItems();
      book.cartConditionButton=true;
    });
  }

  cartItems() {
    this.bookService.cartItems().subscribe((res) => {
      console.log('cartItems', res);
      this.books = res['result'];
      console.log('books array', this.books);
      this.bag=this.books.length;
    });
  }
  
  review() {
    return Math.floor(Math.random() * (5 - 1) + 1);
  }
}
