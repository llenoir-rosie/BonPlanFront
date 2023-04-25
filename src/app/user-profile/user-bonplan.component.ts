import { Component, Injectable, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { User } from "../User";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AppComponent } from "../app.component";
import { Bonplan } from "../bonplan";
import { MatDialog } from "@angular/material/dialog";
import { Activite } from "../activite";
import { Ville } from "../ville";
import { cityactivities } from "../cityactivity";

@Component({
    selector: 'userProfile',
    templateUrl: './user-bonplan.component.html',
    styleUrls: ['./user-bonplan.components.css'],
  })
@Injectable({
providedIn: 'root'
})
export class UserBonPlanComponent implements OnInit{
  
  
  ngOptions = ["Les mieux notés","Les plus récents"];
  ngDropdown = "Les mieux notés";
  ngOptionsAddAct : String[];
  ngDropdownAddAct : String;
  ngOptionsAddCity : String[]
  ngDropdownAddCity : String
  username: String;
  note : Number = 0;
  AllBonPlan: Bonplan[];
  listeAllActivites : Activite[];
  msgError : String;
  allowUserRight: boolean;
  allowModeratorRight: boolean;
  currentUser: String;
  bonplanDeleted : Boolean  = false;
  newBP : Bonplan;
  newCityActivity : cityactivities;
  public listAllCities: Ville[];
  constructor(private dialog : MatDialog, private router: Router, private route: ActivatedRoute, private http: HttpClient, private appComponent: AppComponent) {}


    ngOnInit(): void {
      
      const routeParams = this.route.snapshot.params;
      this.route.params.subscribe(routeParams => { 
          this.username = routeParams['currentUser']
          this.getBonPlanUser(this.username);
      
    });
    console.log("fonction read in init")
    this.getAllActivities();
    this.getAllCities();
    this.getCitiesActivities();
  

    
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

      localStorage.setItem('currentImg', "./assets/img/activite-navbar.jpeg");
      localStorage.setItem('currentVille', "");
      localStorage.setItem('currentActivite', "");
      this.appComponent.ngOnInit();
  }

  public getBonPlanUser(username: String) {
    this.msgError = "";
    this.http.get<Bonplan[]>("http://localhost:8080/" + username + "/AllBonPlan").subscribe((data) => {
        this.AllBonPlan = data;
       
        if (this.AllBonPlan.length == 0) {
            this.msgError = "Vous n'avez pas ENCORE crée de Bon Plan ! "
        }
      })
}

public getAllCities(){
  this.ngOptionsAddCity=[" - - - Ville - - - "]
  this.http.get<Ville[]>("http://localhost:8080/cities").subscribe((data) => {
    this.listAllCities = data;  })
    // this.listAllCities = this.listAllCities?.sort((a : Ville , b : Ville) =>
    // (a.name < b.name) ? -1 : 1)
}

public getAllActivities(){
  this.ngOptionsAddAct=[" - - - Activité - - - "]
  this.http.get<Activite[]>("http://localhost:8080/activities").subscribe((data) => {
    this.listeAllActivites = data;
 })
  

}

public getCitiesActivities(){
  console.log("fnct get cities-activities")
  this.listAllCities = this.listAllCities?.sort((a : Ville , b : Ville) =>
    (a.name < b.name) ? -1 : 1)
  this.listeAllActivites = this.listeAllActivites?.sort((a : Activite , b : Activite) => (a.name < b.name) ? -1 : 1)
 
  for (var i=0; i<(this.listAllCities).length; i++){
    this.ngOptionsAddCity.push(this.listAllCities[i].name)
  }
  for (var i = 0; i< (this.listeAllActivites).length; i++){
    this.ngOptionsAddAct.push(this.listeAllActivites[i].name)
  }
 
}



public deleteBonPlanUsr(BPname : String, BPcity : String, BPactivity : String){
  this.http.delete<String>("http://localhost:8080/"+BPcity+"/"+BPactivity+"/"+BPname).subscribe(() => {
    //Refresh listBonPlan whithout bonplan deleted
    // this.http.get<Bonplan[]>("http://localhost:8080/" + BPcity + "/" + BPactivity + "/bonplan").subscribe((data) => {
    //   this.AllBonPlan = data;
    // })
    this.getBonPlanUser(this.username)
  });
  this.bonplanDeleted = true;
}


public updateBonPlanUsr(bp : Bonplan){
  console.log("clicked update")
}

public moyenneTableau(tab: Number[]) {
  let moyenne : number = 0;
  for (let i in tab){
    moyenne = moyenne + (Number(tab[i])/tab.length);
  }
  return moyenne.toFixed(1);
}

@ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
  this.dialog.open(templateRef);
}

public sortBP(){
  let critere = document.getElementById("DropdownOptions")
  console.log(critere)
  // let critere= (<HTMLInputElement>document.getElementById("opt")).value
  // console.log(critere)

}

public GetNote(Note : Number){
  this.note = Note
}

public AddNewBP(){
  let bpname = (<HTMLInputElement>document.getElementById("bp-name")).value;
  let bpdescription = (<HTMLInputElement>document.getElementById("bp-description")).value
  let act = (<HTMLInputElement>document.getElementById("DropdownOptionsAct")).value
  let city = (<HTMLInputElement>document.getElementById("DropdownOptionsCity")).value
  this.newBP = new Bonplan(city, act, bpname, bpdescription, this.username, [this.note]);
  console.log(this.newBP)
  this.newCityActivity = new cityactivities(0, city, act);
  if (bpname!="" && bpdescription!="" && act!=" - - - Activité - - - " &&
          city!=" - - - Ville - - - " && this.note!=0){
            this.http.post("http://localhost:8080/cityactivities/new", this.newCityActivity).subscribe((data)=>{})
            this.http.post('http://localhost:8080/' + city + '/' +  act + '/newbonplan', this.newBP).subscribe((data) => {
              this.getBonPlanUser(this.username) })
  }
  else{
    console.log("certains champs sont vides")
  }
  this.note = 0

  

}

}
