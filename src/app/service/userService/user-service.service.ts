import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpService} from '../httpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService:HttpService,public snakeBar:MatSnackBar) { }

  loginUser(data: { email: any; password: any; }){
    return  this.httpService.post('User/Login',data)
  }

  registerUser(data: { fullName: any; email: any; phone: any; password: any; }){
  return  this.httpService.post('User/Register',data)
  }

  customerDetails(data:any){
    console.log("data in user service",data);
    return this.httpService.post('CustomerDetails/AddCustomerDetails',data);
  }

  public snakeBarMethod(message: string){
    this.snakeBar.open(message, 'cancel')
  }
}