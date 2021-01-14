import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { UserService } from '../../service/userService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  hide = true;
  errors: any;
  constructor(private user: UserService, public route: Router, public snackBar: MatSnackBar) { }
  
  Email = new FormControl('', [
    Validators.email, 
    Validators.required]);
  Password = new FormControl('', [
    Validators.minLength(8),
    Validators.required,]);
  Phone = new FormControl('', [
    Validators.pattern('[7-9]{1}[0-9]{9}')]);
  FullName = new FormControl("", [
    Validators.pattern('[a-zA-Z]{2,}')]);

  getEmailErrorMsg() {
    return this.Email.hasError('required')
      ? 'Email is Required'
      : 'please enter valid email';
  }

  getFullNameErrorMsg() {
    return this.FullName.hasError('required')
      ? 'Name is Required'
      : 'please enter valid Name';
  }

  getPasswordErrorMsg() {
    return this.Password.hasError('required')
      ? 'Password is Required'
      : 'please enter valid Password';
  }
  
  getPhoneNumberErrorMsg() {
    return this.Phone.hasError('required')
      ? 'Phone Number is Required'
      : 'please enter valid PhoneNumber';
  }

  ngOnInit(): void { }

  register() {
    let userdata = {
      "fullName": this.FullName.value,
      "email": this.Email.value,
      "phone": this.Phone.value,
      "password": this.Password.value
    }
    this.user.registerUser(userdata).subscribe(response => {
        this.snackBar.open("register successful", 'success', { duration: 2000 })
        this.route.navigate(['login'])
    },
      error => {
        this.snackBar.open("register unsuccessful.", 'failed', { duration: 2000 })
      }
    )
  }
}
