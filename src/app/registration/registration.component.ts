import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../User';
import { FormGroup, FormControl, Validators} from '@angular/forms'; 
import {catchError} from 'rxjs/operators';

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
  constructor(private router: Router, private http: HttpClient) {}
  
  ngOnInit() {
    this.newUserForm = new FormGroup (
      {
        first_name : new FormControl('', Validators.required),
        last_name : new FormControl('', Validators.required),
        email : new FormControl('', Validators.required),
        password : new FormControl('', Validators.required),
        username : new FormControl('', Validators.required),
      }
    )
  }

  addNewUser() {
    this.newUser = new User(this.newUserForm.value.first_name,this.newUserForm.value.last_name, this.newUserForm.value.email, this.newUserForm.value.password, this.newUserForm.value.username, "USER")
    this.http.post<String>('http://localhost:8080/registration', this.newUser)
      .pipe ( 
        catchError((error) => this.msg = error.error.message
      ))
     .subscribe((data) => {
       this.success = true;
     })
     this.router.navigate(['/login']);
  }

}