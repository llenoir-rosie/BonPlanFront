import { Component, Injectable, OnInit } from "@angular/core";
import { User } from "../User";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AppComponent } from "../app.component";
import { Mauvaisplan } from "../mauvaisplan";

@Component({
    selector: 'userProfile',
    templateUrl: './user-mauvaisplan.component.html',
    // styleUrls: ['user-mauvais-plan.component.css'],
  })

@Injectable({
providedIn: 'root'
})
export class UserMauvaisPlanComponent implements OnInit{

  userDetails : User;
  username : String;
  AllMauvaisPlan : Mauvaisplan[];
  msgError2 : String;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private appComponent: AppComponent) {}


  ngOnInit(): void {
    const routeParams = this.route.snapshot.params;
    this.route.params.subscribe(routeParams => { 
      this.username = routeParams['currentUser'] 
      this.getMauvaisPlanUser(this.username)
  });
  this.appComponent.ngOnInit();

}
    

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