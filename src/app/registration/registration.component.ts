import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Ville } from '../ville';
import { BrowserModule } from '@angular/platform-browser';
import { User } from '../User';
import { FormGroup, FormControl, Validators} from '@angular/forms'; 

@Component({
  selector: 'registration',
  templateUrl: 'registration.component.html'
})

export class Registration implements OnInit{
  newUserForm: FormGroup;

  success: String;
  newUser: User;
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
    this.newUser = new User(this.newUserForm.value.first_name,this.newUserForm.value.last_name, this.newUserForm.value.email, this.newUserForm.value.password, this.newUserForm.value.username)
    this.http.post<String>('http://localhost:8080/registration', this.newUser).subscribe((data) => {
      console.log(data);
    })
  }

}