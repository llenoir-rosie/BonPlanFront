import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../User';
import { FormGroup, FormControl, Validators} from '@angular/forms'; 
import {catchError} from 'rxjs/operators';
import { Token } from '@angular/compiler';
import { AppComponent } from '../app.component';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})

export class LoginComponent implements OnInit{
  loginUserForm: FormGroup;
  logUser: User;
  msg: String = "";
  token = String; 

  constructor(private router: Router, private http: HttpClient, private appComponent: AppComponent) {}
  
  ngOnInit() {
    localStorage.setItem('currentImg', "./assets/img/activite-navbar.jpeg");
    localStorage.setItem('currentVille', "");
    this.appComponent.ngOnInit();
    this.loginUserForm = new FormGroup (
      {
        username : new FormControl('', Validators.required),
        password : new FormControl('', Validators.required),
      }
    )
  }
  goToRegistration() {
    this.router.navigate(['/registration'])
  }

  loginUser(){
    this.logUser = new User("","", "", this.loginUserForm.value.password, this.loginUserForm.value.username, "USER");
    this.http.post<string>('http://localhost:8080/login', this.logUser)
    // .pipe ( 
    //   catchError((error) => this.msg = error.error.message
    // ))
    .subscribe((data) => {
      localStorage.setItem('token', Object.values(data)[0]);
      const currentUser = this.loginUserForm.value.username;
      localStorage.setItem('currentUser', currentUser);
      this.router.navigate(['/account', currentUser])
    })
  }

}