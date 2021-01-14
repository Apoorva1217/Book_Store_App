import { Component, Input, OnInit, Output } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/httpService/http-service.service';
import { UserService } from 'src/app/service/userService/user-service.service';
import { BookService } from '../../service/bookService/book-service.service'

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})

export class MycartComponent implements OnInit {
  @Input() booksArray: Array<any> = [];
  panelOpenState = true;
  customerForm: FormGroup;
  books: Array<any> = [];
  addedBooks: Array<any> = [];
  i: any = 1;
  num:any=1;
  bag: any;
  step = 0;

  @Output() length!:number; 
  constructor(
    private bookService: BookService,
    private router: Router,
    private snackbar: MatSnackBar,
    private httpService:HttpService,
    private userService:UserService
  ) {}

  FullName = new FormControl("", [
    Validators.pattern('[a-zA-Z]{2,}')]);
  Phone = new FormControl('', [
    Validators.pattern('[7-9]{1}[0-9]{9}')]);
  PinCode=new FormControl('',[
    Validators.pattern('[1-9]{1}[0-9]{5}')]);
  Locality=new FormControl('',[
    Validators.pattern('[a-zA-Z]{3,}')]);
  Address=new FormControl('',[
    Validators.pattern('[a-zA-Z0-9]{3,}')]);
  City=new FormControl('',[
    Validators.pattern('[a-zA-Z]{3,}')]);
  Landmark=new FormControl('',[
    Validators.pattern('[a-zA-Z0-9]{3,}')]);
    Email = new FormControl('', [
      Validators.email, 
      Validators.required]);


    getFullNameErrorMsg() {
      return this.FullName.hasError('required')
        ? 'Name is Required'
        : 'please enter valid Name';
    }

    getPhoneNumberErrorMsg() {
      return this.Phone.hasError('required')
        ? 'Phone Number is Required'
        : 'please enter valid Phone Number';
    }

    getPincodeErrorMsg() {
      return this.PinCode.hasError('required')
        ? 'Pincode is Required'
        : 'please enter valid Pincode';
    }

    getLocalityErrorMsg() {
      return this.Locality.hasError('required')
        ? 'Localty is Required'
        : 'please enter valid Locality';
    }

    getAddressErrorMsg() {
      return this.Address.hasError('required')
        ? 'Address is Required'
        : 'please enter valid Address';
    }

    getCityErrorMsg() {
      return this.City.hasError('required')
        ? 'City is Required'
        : 'please enter valid City';
    }

    getLandmarkErrorMsg() {
      return this.Landmark.hasError('required')
        ? 'Landmark is Required'
        : 'please enter valid Landmark';
    }

    getEmailErrorMsg() {
      return this.Email.hasError('required')
        ? 'Email is Required'
        : 'please enter valid email';
    }

  ngOnInit(): void { 
    this.cartItems();
  }

  customerDetails(){
    let userdata = {
      "fullName": this.FullName.value,
      "email": this.Email.value,
      "phone": this.Phone.value,
      "pincode":this.PinCode.value,
      "locality":this.Locality.value,
      "address":this.Address.value,
      "city":this.City.value,
      "landmark":this.Landmark.value
    }
    this.userService.customerDetails(userdata).subscribe((response) => {
      console.log('Customer details added sucessfully sucessfully', response);
      this.nextStep();
    });
  }

  checkout() {
    this.router.navigate(['dashboard/orderDone']);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  cartItems() {
    this.bookService.cartItems().subscribe((res) => {
      console.log('cartItems', res);
      this.books = res['result'];
      console.log('books array', this.books);
      this.length=this.books.length;
    });
  }

  increaseCartQuantity(book:any){
    this.bookService.increaseQuantity(book).subscribe((response=>{
      book.isValid=true;
      console.log("Quantity Added Successfully",response);
      this.cartItems();
    }))
  }

  decreaseCartQuantity(book:any,quantity:any){
    this.bookService.decreaseQuantity(book.product_id,quantity).subscribe((response=>{
      book.isValid=true;
      console.log("Quantity Removed Successfully",response);
      this.cartItems();
    }))
  }
  
  removeItem(product: any) {
    console.log('product_id', product);
    this.books.splice(product, 1);
    this.bookService.removeItem(product.product_id).subscribe((res) => {
      console.log('remove item', res);
      this.httpService.changeMessage({});
    });
  }
}