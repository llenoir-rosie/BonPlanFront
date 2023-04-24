import { Component, Injectable, OnInit } from "@angular/core";
import { User } from "../User";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AppComponent } from "../app.component";
import { Bonplan } from "../bonplan";

@Component({
    selector: 'userProfile',
    templateUrl: './user-bonplan.component.html',
    // styleUrls: ['user-bonplan.component.css'],
  })
@Injectable({
providedIn: 'root'
})
export class UserBonPlanComponent implements OnInit{

  username: String;
  AllBonPlan: Bonplan[];
  msgError : String;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private appComponent: AppComponent) {}


    ngOnInit(): void {
      const routeParams = this.route.snapshot.params;
      this.route.params.subscribe(routeParams => { 
          this.username = routeParams['currentUser']
          this.getBonPlanUser(this.username);
    });
      localStorage.setItem('currentImg', "./assets/img/activite-navbar.jpeg");
      localStorage.setItem('currentVille', "");
      localStorage.setItem('currentActivite', "");
      this.appComponent.ngOnInit();
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
}

}
