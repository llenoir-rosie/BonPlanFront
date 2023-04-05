import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../User';
import { FormGroup, FormControl, Validators} from '@angular/forms'; 
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})

export class LoginComponent implements OnInit{
  loginUserForm: FormGroup;
  logUser: User;
  msg: String = "";
  constructor(private router: Router, private http: HttpClient) {}
  
  ngOnInit() {
    this.loginUserForm = new FormGroup (
      {
        email : new FormControl('', Validators.required),
        password : new FormControl('', Validators.required),
      }
    )
  }
  goToRegistration() {
    this.router.navigate(['/registration'])
  }

  loginUser(){
    this.logUser = new User("","", this.loginUserForm.value.email, this.loginUserForm.value.password, "", "USER");
    this.http.post<User>('http://localhost:8080/login', this.logUser)
    .pipe ( 
      catchError((error) => this.msg = error.error.message
    ))
   .subscribe((data) => {
     localStorage.setItem("currentUser", JSON.stringify(data));
   })
   this.router.navigate(['/ville']);
  }

}