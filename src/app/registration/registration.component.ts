import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../User';
import { FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'; 
import Validation from '../Validation';
import {catchError} from 'rxjs/operators';
import { AppComponent } from "../app.component";

@Component({
  selector: 'registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.css'],
})

export class Registration implements OnInit{
  newUserForm: FormGroup;
  success: Boolean = false;
  newUser: User;
  msg: String;
  submitted: Boolean;
  error_control: Boolean;
  error_empty: Boolean;

  constructor(private router: Router, private http: HttpClient, private appComponent: AppComponent) {}
  
  ngOnInit() {
    this.submitted = false;
    this.error_control = false;
    this.error_empty = false;
    this.newUserForm = new FormGroup (
      {
        first_name : new FormControl('', Validators.required),
        last_name : new FormControl('', Validators.required),
        email : new FormControl('', Validators.required),
        password : new FormControl('', Validators.required),
        username : new FormControl('', Validators.required),
      }
    )
    sessionStorage.setItem('currentImg', "./assets/img/activite-navbar.jpeg");
    sessionStorage.setItem('currentVille', "");
    sessionStorage.setItem('currentActivite', "");
    this.appComponent.ngOnInit();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.newUserForm.controls;

    
  }

  addNewUser() {
    
    this.submitted = true;
    this.error_control = false;
    this.error_empty = false;
    if (this.newUserForm.value.password != (<HTMLInputElement>document.getElementById("password_control")).value) {
      this.error_control = true;
    } else if ((<HTMLInputElement>document.getElementById("password_control")).value == "") {
      this.error_empty = true;
    }
    if (!this.f['first_name'].errors && !this.f['last_name'].errors  && !this.f['email'].errors  && !this.f['password'].errors  && !this.f['username'].errors && this.error_control==false && this.error_empty==false) { 
      this.newUser = new User(this.newUserForm.value.first_name,this.newUserForm.value.last_name, this.newUserForm.value.email, 
                    this.newUserForm.value.password, this.newUserForm.value.username, "USER");
      this.http.post<String>('http://localhost:8080/registration', this.newUser)
      // .pipe ( 
      //   catchError((error) => this.msg = error.error.message
      // ))
      .subscribe((data) => {
        this.success = true;
      })
      this.router.navigate(['/login']);
    }
  }

  checkControlPassword() {
    this.error_control = false;
    this.error_empty = false;
    if (this.newUserForm.value.password != (<HTMLInputElement>document.getElementById("password_control")).value) {
      this.error_control = true;
    } else if ((<HTMLInputElement>document.getElementById("password_control")).value == "") {
      this.error_empty = true;
    }
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }
}