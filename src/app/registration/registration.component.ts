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

  constructor(private router: Router, private http: HttpClient, private appComponent: AppComponent) {}
  
  ngOnInit() {
    this.submitted = false;
    this.newUserForm = new FormGroup (
      {
        first_name : new FormControl('', Validators.required),
        last_name : new FormControl('', Validators.required),
        email : new FormControl('', Validators.required),
        password : new FormControl('', Validators.required),
        username : new FormControl('', Validators.required),
      }
    )
    localStorage.setItem('currentImg', "./assets/img/activite-navbar.jpeg");
    localStorage.setItem('currentVille', "");
    localStorage.setItem('currentActivite', "");
    this.appComponent.ngOnInit();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.newUserForm.controls;

    
  }

  addNewUser() {
    //if (!this.f['name'].errors && !this.f['address'].errors) {
    this.submitted = true;
    if (!this.f['first_name'].errors && !this.f['last_name'].errors  && !this.f['email'].errors  && !this.f['password'].errors  && !this.f['username'].errors) { 
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

  goToLogin() {
    this.router.navigate(['/login'])
  }
}