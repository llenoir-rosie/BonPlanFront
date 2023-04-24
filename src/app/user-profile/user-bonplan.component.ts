import { Component, Injectable, OnInit } from "@angular/core";
import { User } from "../User";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AppComponent } from "../app.component";
import { Bonplan } from "../bonplan";

@Component({
    selector: 'userProfile',
    templateUrl: './user-bonplan.component.html',
    styleUrls: ['./user-bonplan.components.css'],
  })
@Injectable({
providedIn: 'root'
})
export class UserBonPlanComponent implements OnInit{
  
  

  username: String;
  AllBonPlan: Bonplan[];
  msgError : String;
  allowUserRight: boolean;
  allowModeratorRight: boolean;
  currentUser: String;
  bonplanDeleted : Boolean  = false;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private appComponent: AppComponent) {}


    ngOnInit(): void {
      const routeParams = this.route.snapshot.params;
      this.route.params.subscribe(routeParams => { 
          this.username = routeParams['currentUser']
          this.getBonPlanUser(this.username);
    });

    
    if (localStorage.getItem("currentUser") == null) {
      this.allowModeratorRight = false
      this.allowUserRight = false
    } else {
      this.currentUser = localStorage.getItem("currentUser")!
      if (localStorage.getItem("currentUserRole")! == 'MODERATOR') {
        this.allowModeratorRight = true
      } else {
        this.allowUserRight = true
      }
    }

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

public deleteBonPlanUsr(BPname : String, BPcity : String, BPactivity : String){
  this.http.delete<String>("http://localhost:8080/"+BPcity+"/"+BPactivity+"/"+BPname).subscribe(() => {
    //Refresh listBonPlan whithout bonplan deleted
    this.http.get<Bonplan[]>("http://localhost:8080/" + BPcity + "/" + BPactivity + "/bonplan").subscribe((data) => {
      this.AllBonPlan = data;
    })
  });
  this.bonplanDeleted = true;
}


public updateBonPlanUsr(bp : Bonplan){
  console.log("clicked update")
}

}
