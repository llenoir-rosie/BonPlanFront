import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { User } from "../User";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AppComponent } from "../app.component";
import { Injectable } from '@angular/core';
import { Bonplan } from "../bonplan";
import { Mauvaisplan } from "../mauvaisplan";

@Component({
    selector: 'userAccount',
    templateUrl: 'user-account.component.html',
    styleUrls: ['user-account.component.css'],
  })

@Injectable({
  providedIn: 'root'
})
export class UserAccountComponent implements OnInit{

    userDetails: User;
    username: String;
    AllBonPlan: Bonplan[]
    AllMauvaisPlan: Mauvaisplan[]
    msgError: String
    msgError2: String
    dialog: any;
    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private appComponent: AppComponent) {}

ngOnInit(): void {
    const routeParams = this.route.snapshot.params;
    this.route.params.subscribe(routeParams => { 
        this.username = routeParams['currentUser'] 
        this.getUserDetails(this.username); 
        this.getBonPlanUser(this.username);
        this.getMauvaisPlanUser(this.username)
    });
    this.appComponent.ngOnInit();

}

public getUserDetails(username: String) {
    this.http.get<User>("http://localhost:8080/" + username + "/Details").subscribe((data) => {
        this.userDetails = data;
        localStorage.setItem('currentUserRole', this.userDetails.role.toString())
      }) 
}

public getBonPlanUser(username: String) {
    this.msgError = "";
    this.http.get<Bonplan[]>("http://localhost:8080/" + username + "/AllBonPlan").subscribe((data) => {
        this.AllBonPlan = data;
        console.log(this.AllBonPlan)
        if (this.AllBonPlan.length == 0) {
            this.msgError = "Vous n'avez pas ENCORE crée de Bon Plan ! "
        }
      })
};

public getMauvaisPlanUser(username: String) {
    this.msgError2 = "";
    this.http.get<Mauvaisplan[]>("http://localhost:8080/" + username + "/AllMauvaisPlan").subscribe((data) => {
        this.AllMauvaisPlan = data;
        if (this.AllMauvaisPlan.length == 0) {
            this.msgError2 = "Vous n'avez pas ENCORE crée de Mauvais Plan ! "
        }
      }) 
}



}