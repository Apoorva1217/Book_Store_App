import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/userService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hide = true;
  errors: any;
  constructor(private user: UserService, public snackBar: MatSnackBar, public route: Router) { }

  Email = new FormControl('', [
    Validators.email, 
    Validators.required]);
  Password = new FormControl('', [
    Validators.minLength(8),
    Validators.required,
  ]);

  getEmailErrorMessage() {
    return this.Email.hasError('required')
      ? 'Email is Required'
      : 'please enter valid email';
  }

  getPasswordErrorMessage() {
    return this.Password.hasError('required')
      ? 'Password is Required '
      : 'Password should be minimum of 8 characters';
  }
  
  ngOnInit(): void {
  }

  login() {
    let userData = {
      "email": this.Email.value,
      "password": this.Password.value
    }
    this.user.loginUser(userData).subscribe((response) => {
      console.log("login successful",response)
      localStorage.setItem('token',response['token'])
      if (response['token']){
        this.snackBar.open("login successful.", 'success', { duration: 2000 })
        this.route.navigate(['dashboard'])
      }
    })
  }
}