import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/service/bookService/book-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  header!: FormGroup
  name: any
  email: any
  bag = 0;
  list: any
  books: Array<any> = [];
  @Input() childMessage: number | undefined;

  constructor(public route: Router, private fb: FormBuilder, public bookService: BookService) { }

  ngOnInit(): void {
    this.header = this.fb.group({
      dataa: [""]
    })
  }
  gotoCart() {
    this.route.navigate(['cart']);
  }
  dashboard() {
    this.route.navigate(['dashboard']);
  }

  cartItems() {
    this.bookService.cartItems().subscribe((res) => {
      console.log('cartItems', res);
      this.books = res['result'];
      console.log('books array', this.books);
      this.childMessage = this.books.length;
    });
  }
}