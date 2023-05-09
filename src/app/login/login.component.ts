import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../User';
import { FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'; 
import Validation from '../Validation';
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
  submitted: Boolean;

  constructor(private router: Router, private http: HttpClient, private appComponent: AppComponent) {}
  
  ngOnInit() {
    this.submitted = false;
    sessionStorage.setItem('currentImg', "./assets/img/activite-navbar.jpeg");
    sessionStorage.setItem('currentVille', "");
    this.loginUserForm = new FormGroup (
      {
        username : new FormControl('', Validators.required),
        password : new FormControl('', Validators.required),
      }
    )
    sessionStorage.setItem('currentImg', "./assets/img/activite-navbar.jpeg");
    sessionStorage.setItem('currentVille', "");
    sessionStorage.setItem('currentActivite', "");
    this.appComponent.ngOnInit();
  }
  goToRegistration() {
    this.router.navigate(['/registration'])
  }
  //We also have getter f to access form controls (form.controls) from the template. 
  //For example, we can get username field in the template using f.username instead of form.controls.username.
  get f(): { [key: string]: AbstractControl } {
    return this.loginUserForm.controls;
  }

  loginUser(){
    this.submitted = true;
    this.logUser = new User("","", "", this.loginUserForm.value.password, this.loginUserForm.value.username, "USER");
    this.http.post<string>('http://localhost:8080/login', this.logUser)
    // .pipe ( 
    //   catchError((error) => this.msg = error.error.message
    // ))
    .subscribe((data) => {
      sessionStorage.setItem('token', Object.values(data)[0]);
      this.http.get<User>('http://localhost:8080/' + this.loginUserForm.value.username + '/Details').subscribe((data) => {
        sessionStorage.setItem('currentUser', data.username.toString());
        sessionStorage.setItem('currentUserRole',data.role.toString());
        this.router.navigate(['/ville'])
      })
    })
  }

}