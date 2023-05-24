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
import { TmplAstRecursiveVisitor } from "@angular/compiler";
import { getLocaleDateTimeFormat } from "@angular/common";

@Component({
    selector: 'userProfile',
    templateUrl: './user-bonplan-restricted.component.html',
    styleUrls: ['./user-bonplan.components.css'],
  })
@Injectable({
providedIn: 'root'
})
export class UserBonPlanRestrictedComponent implements OnInit{
  
  
  ngOptions = ["Les mieux notés","Les plus récents", "Le maximum d'avis"];
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

  submitted : Boolean;
  error_bpname : Boolean;
  error_bpdescription : Boolean;
  error_act : Boolean;
  error_city : Boolean;
  error_note : Boolean;
  trie : String
  date: number;
  note_user :String[]
  constructor(private dialog : MatDialog, private router: Router, private route: ActivatedRoute, private http: HttpClient, private appComponent: AppComponent) {}


    ngOnInit(): void {
      this.submitted=false;
      const routeParams = this.route.snapshot.params;
      this.route.params.subscribe(routeParams => { 
          this.username = routeParams['Username']
          this.getBonPlanUser(this.username);

      
    });
    this.getAllActivities();
    this.getAllCities();
    this.getCitiesActivities();
  

    
    if (sessionStorage.getItem("currentUser") == null) {
      this.allowModeratorRight = false
      this.allowUserRight = false
    } else {
      this.currentUser = sessionStorage.getItem("currentUser")!
      if (sessionStorage.getItem("currentUserRole")! == 'MODERATOR') {
        this.allowModeratorRight = true
      } else {
        this.allowUserRight = true
      }
    }

      sessionStorage.setItem('currentImg', "./assets/img/activite-navbar.jpeg");
      sessionStorage.setItem('currentVille', "");
      sessionStorage.setItem('currentActivite', "");
      this.appComponent.ngOnInit();
  }

  public getBonPlanUser(username: String) {
    this.msgError = "";
    this.http.get<Bonplan[]>("http://localhost:8080/" + username + "/AllBonPlan").subscribe((data) => {
        this.AllBonPlan = data?.sort((a : Bonplan , b : Bonplan) =>
        (this.moyenneTableau(a.note) > this.moyenneTableau(b.note)) ? -1 : 1);
       
        if (this.AllBonPlan.length == 0) {
            this.msgError = "Vous n'avez pas ENCORE créé de Bon Plan ! "
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
  this.listAllCities = this.listAllCities?.sort((a : Ville , b : Ville) =>
    (a.name < b.name) ? -1 : 1)
  this.listeAllActivites = this.listeAllActivites?.sort((a : Activite , b : Activite) => (a.name < b.name) ? -1 : 1)
 
  for (var i=0; i<(this.listAllCities)?.length; i++){
    this.ngOptionsAddCity.push(this.listAllCities[i].name)
  }
  for (var i = 0; i< (this.listeAllActivites)?.length; i++){
    this.ngOptionsAddAct.push(this.listeAllActivites[i].name)
  }
 
}



public deleteBonPlanUsr(BPname : String, BPcity : String, BPactivity : String){
  this.http.delete<String>("http://localhost:8080/"+BPcity+"/"+BPactivity+"/"+BPname).subscribe(() => {
  this.getBonPlanUser(this.username)
  });
  this.bonplanDeleted = true;
}


public updateBonPlanUsr(bp : Bonplan){
  let new_descr = (<HTMLInputElement>document.getElementById("new_desciription")).value;
  this.newBP = new Bonplan(bp.ville_name, bp.activity_type, bp.name, new_descr, bp.user_name, bp.note, bp.note_user, bp.date);
  this.http.put('http://localhost:8080/'+bp.ville_name+'/'+bp.activity_type+'/updatebonplan',this.newBP).subscribe((data)=>
  this.getBonPlanUser(this.username))
  
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



public GetNote(Note : Number){
  this.note = Note
}

public AddNewBP(){
  this.submitted = true;
  this.error_bpname = false;
  this.error_bpdescription = false;
  this.error_act = false;
  this.error_city = false;
  this.error_note = false;
  this.date = Date.now()
  this.note_user=[this.username]
  let bpname = (<HTMLInputElement>document.getElementById("bp-name")).value;
  let bpdescription = (<HTMLInputElement>document.getElementById("bp-description")).value
  let act = (<HTMLInputElement>document.getElementById("DropdownOptionsAct")).value
  let city = (<HTMLInputElement>document.getElementById("DropdownOptionsCity")).value
  this.newBP = new Bonplan(city, act, bpname, bpdescription, this.username, [this.note], this.note_user, this.date );
  this.newCityActivity = new cityactivities(0, city, act);
  if(bpname==""){
    this.error_bpname=true
  }
  if(bpdescription==""){
    this.error_bpdescription=true
  }
  if(city==" - - - Ville - - - "){
    this.error_city=true
  }
  if(act==" - - - Activité - - - "){
    this.error_act = true
  }
  if(this.note==0){
    this.error_note = true
  }

 
  if (bpname!="" && bpdescription!="" && act!=" - - - Activité - - - " &&
          city!=" - - - Ville - - - " && this.note!=0){

            console.log(this.newBP)

            this.http.post("http://localhost:8080/cityactivities/new", this.newCityActivity).subscribe((data)=>{})
            this.http.post('http://localhost:8080/' + city + '/' +  act + '/newbonplan', this.newBP).subscribe((data) => {
              this.getBonPlanUser(this.username) })
            this.dialog.closeAll();
  }

  this.note = 0

}
public Annuler(){
  this.submitted = true;
  this.error_bpname = false;
  this.error_bpdescription = false;
  this.error_act = false;
  this.error_city = false;
  this.error_note = false;
  this.note = 0
}

public Trie(){
  let newtrie :String = (<HTMLInputElement>document.getElementById("DropdownOptions")).value
  if (this.trie != newtrie){
    if (newtrie=="Les mieux notés"){
      this.AllBonPlan = this.AllBonPlan?.sort((a : Bonplan , b : Bonplan) =>
      (this.moyenneTableau(a.note) > this.moyenneTableau(b.note)) ? -1 : 1)    
    }else if(newtrie=="Les plus récents"){
      this.AllBonPlan = this.AllBonPlan?.sort((a : Bonplan , b : Bonplan) =>
      (a.date > b.date) ? -1 : 1)
    }else if (newtrie == "Le maximum d'avis"){
      this.AllBonPlan = this.AllBonPlan?.sort((a : Bonplan , b : Bonplan) =>
      (a.note.length > b.note.length) ? -1 : 1)
    }
    this.trie = newtrie
  }
}

public getDateCreaBp(dateBp : number){
  let DateNow = Date.now()
  let delta : number = (DateNow - dateBp) //en millisecondes
  const delta_sec = delta / 1000
  const delta_min = delta_sec / 60
  const delta_hour = delta_min / 60 
  const delta_day = delta_hour / 24
  const delta_month = delta_day / 31
  const delta_year = delta_day / 365
  let delta_final : number
  let Unite : String

  if (delta_sec<0){
    delta_final = 0
    Unite = "secondes"
  } else if (delta_sec<60){
    delta_final = delta_sec
    Unite = "secondes"
  } else if (delta_min <60){
    delta_final = delta_min
    Unite = "minutes"
  } else if (delta_hour < 24){
    delta_final = delta_hour
    Unite = "heures"
  } else if (delta_day < 31){
    delta_final = delta_day
    Unite = "jours"
  } else if (delta_month < 12){
    delta_final = delta_month
    Unite = "mois"
  } else {
    delta_final = delta_year
    Unite = "années"
  }

  if (dateBp==0 || dateBp == null){ //si la date n est pas renseignée pour le bonplan
    delta_final = 0 , Unite=""
  }

  if (Math.round(delta_final)==1){//enlever le "s" lorsque delta == 1
    Unite = Unite.slice(0,-1)
  }
  
  return [Math.round(delta_final) , Unite]
}


}
