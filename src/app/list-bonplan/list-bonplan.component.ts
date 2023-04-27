import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bonplan } from '../bonplan';
import { Mauvaisplan } from '../mauvaisplan' ;
import { Ville } from '../ville';
import { Activite } from '../activite';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponentAddBonPlan } from './pop-up-addBonPlan';
import { PopUpComponentAddMauvaisPlan } from './pop-up-addMauvaisPlan';
import { PopUpComponentUpdateBonPlan } from './pop-up-updateBonPlan.component';
import { PopUpComponentUpdateMauvaisPlan } from './pop-up-updateMauvaisPlan.component';
import { AppComponent } from "../app.component";
import { style } from '@angular/animations';
import { BonPlanNote } from '../bonplan_note';
import { commentary } from '../commentary';

@Component({
  selector: 'app-list-bonplan',
  templateUrl: './list-bonplan.component.html',
  styleUrls: ['list-bonplan.component.css'],
})
export class ListBonplanComponent implements OnInit {

pop() {
throw new Error('Method not implemented.');
}
  ngOptions = ["Les mieux notés","Les plus récents"];
  ngDropdown = "Les mieux notés";
  ngOptions2 = ["Les moins bien notés","Les plus récents"];
  ngDropdown2 = "Les moins bien notés";
  ville: Ville|undefined;
  bp: Bonplan[]=[];
  mp: Mauvaisplan[]=[];
  imgBackGround: String;
  nomdelaville: String;
  nomdelactivite: String;
  public listeBonPlan: BonPlanNote[];
  public listeMauvaisPlan: BonPlanNote[];
  bonplanDeleted: Boolean = false;
  mauvaisplanDeleted: Boolean = false;
  allowUserRight: boolean;
  allowModeratorRight: boolean;
  currentUser: String;
  currentImg: String;
  currentVille: String;
  currentActivite: String;
  newBP: Bonplan;
  
  allBonPlan: BonPlanNote[];
  allMauvaisPlan: BonPlanNote[];
  trie1 : String;
  trie2 : String;
  allBonPlanNote: BonPlanNote[];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private dialogRef: MatDialog,
    private appComponent: AppComponent) { }

  ngOnInit() {
    //Recup the city name of bonplan 
    const villeName: string|null = this.route.snapshot.paramMap.get('name');
    this.nomdelaville = (villeName+'').charAt(0).toUpperCase()+villeName?.substr(1);

    //Recup the activity name of bon plan
    const activiteName: string|null = this.route.snapshot.paramMap.get('activity.name');
    this.nomdelactivite = activiteName+'';

    this.imgBackGround = '../assets/img/' + this.nomdelactivite + '.jfif'
    // (activiteName+'').charAt(0).toUpperCase()+activiteName?.substr(1);
    this.getAllBonPlan(this.nomdelaville, this.nomdelactivite);
    this.getImgActivity(this.nomdelactivite);
    if (localStorage.getItem("currentUser") == null) {
      this.allowModeratorRight = false
      this.allowUserRight = false
    } else {
      this.currentUser = localStorage.getItem("currentUser")!
      if (localStorage.getItem("currentUserRole")! == 'MODERATOR') {
        this.allowModeratorRight = true
      } else if (localStorage.getItem("currentUserRole") == 'USER'){
        this.allowUserRight = true
      }
    }

    localStorage.setItem("currentVille"," à " + this.nomdelaville.toString());
    localStorage.setItem("currentActivite", "\xa0"  + this.nomdelactivite.toString());
  }



  //"attrape" les bons et les mauvais plans en foncion de la ville et de l'activité où l'on est
  public getAllBonPlan(nomdelaville: String, nomdelactivite: String) {
    this.http.get<BonPlanNote[]>("http://localhost:8080/" + nomdelaville + "/" + nomdelactivite + "/bonplan").subscribe((data) => {
      // trie les bons plans en fonction de la note moyenne des utilisateurs
      this.allBonPlanNote = [];
      this.listeBonPlan = data.sort((a,b) => Number(this.moyenneTableau(b.note)) - Number(this.moyenneTableau(a.note)));

      this.listeBonPlan.forEach(elt => {
        console.log("aze", elt)
        let i = 0;
          while (i < elt.note_user?.length && elt.note_user[i] != this.currentUser) {
            i++          
          }
          if (i < elt.note_user?.length ) {
            // this.http.get<commentary[]>("http://localhost:8080/commentaries/a").subscribe((data) => {
            //   let a = data
            //   console.log("eee", a);
            // })
            let bon_plan_note = new BonPlanNote(elt, "true", "commentaire de base");
            this.allBonPlanNote.push(bon_plan_note)
          } else {
            let bon_plan_note = new BonPlanNote(elt, "false", "commentaire de base");
            this.allBonPlanNote.push(bon_plan_note)
          }
      })
      

      this.allBonPlan = this.allBonPlanNote.filter(el => Number(this.moyenneTableau(el.note)) > 2);
      this.allMauvaisPlan = this.allBonPlanNote.filter(el => Number(this.moyenneTableau(el.note)) <= 2).reverse();
      this.trie1 = "Les mieux notés"
      this.trie2 = "Les moins bien notés"
      this.Trie1()
      this.Trie2()
    })
  }

  // fait une requette au back pour attraper la classe activite correspondant au nom de l'activite où on est
  public getImgActivity(nameact: String) { 
    this.http.get<Activite>("http://localhost:8080/activity/" + nameact).subscribe((data) => {
      this.currentImg = data.image;
      // on met la bonne valeur à currentImg dans localStorage et on recharge le composant appComponent
      localStorage.setItem('currentImg', this.currentImg.toString());
      this.appComponent.ngOnInit();
    })
  }

  public deleteBonPlan(bpName: String) {
    //Delete the Object bonplan which have his name equals to bpName
    this.http.delete<String>(`http://localhost:8080/${this.nomdelaville}/${this.nomdelactivite}/${bpName}`).subscribe(() => {
      //Refresh listBonPlan whithout bonplan deleted
      this.getAllBonPlan(this.nomdelaville, this.nomdelactivite);
    });
    this.bonplanDeleted = true;
  }

  // Formulaire de création de bons plans / mauvais plans
  public updateBonPlan(bp: Bonplan) {
    this.dialogRef.open(PopUpComponentUpdateBonPlan, {
      width: '600px',
      height: '550px',
      data: {
        nameCity: this.nomdelaville,
        nameActivity:this.nomdelactivite,
        bp: bp 
      }
    }).afterClosed().subscribe(() => this.getAllBonPlan(this.nomdelaville, this.nomdelactivite));
  }

  public goToFormAddBonPlan() {
    this.dialogRef.open(PopUpComponentAddBonPlan, {
      width: '600px',
      height: '755px',
      data: {
        nameCity: this.nomdelaville,
        nameActivity:this.nomdelactivite 
      }
    }).afterClosed().subscribe(() => this.getAllBonPlan(this.nomdelaville, this.nomdelactivite));
  }

  public moyenneTableau(tab: Number[]) {
    let moyenne : number = 0;
    for (let i in tab){
      moyenne = moyenne + (Number(tab[i])/tab.length);
    }
    return moyenne.toFixed(1);
  }

  public noteClick(note:String, bpNote: Number[], bpName: String, bpAdress: String, bpNoteUser: String[]) {
    let nouvelleNote : Number[] = bpNote;
    nouvelleNote.push(Number(note));
    let newUserNote : String[] = bpNoteUser;
    newUserNote.push(String(localStorage.getItem('currentUser')!));
    this.newBP = new Bonplan(this.nomdelaville, this.nomdelactivite, bpName, bpAdress, localStorage.getItem('currentUser')!,
    nouvelleNote, newUserNote, 0);

    this.http.put("http://localhost:8080/" + this.nomdelaville + "/" + this.nomdelactivite + "/updatebonplan", this.newBP).subscribe(
    () => {
      this.getAllBonPlan(this.nomdelaville, this.nomdelactivite);
    })

  }

  public Trie1(){
    let newtrie :String = (<HTMLInputElement>document.getElementById("DropdownOptions")).value
    if (this.trie1 != newtrie){
      if (newtrie=="Les mieux notés"){
        this.allBonPlan = this.allBonPlan?.sort((a : Bonplan , b : Bonplan) =>
        (this.moyenneTableau(a.note) > this.moyenneTableau(b.note)) ? -1 : 1)    
      }else{
        this.allBonPlan = this.allBonPlan?.sort((a : Bonplan , b : Bonplan) =>
        (a.date > b.date) ? -1 : 1)
      }
      this.trie1 = newtrie
    }
  }
  public Trie2(){
    let newtrie :String = (<HTMLInputElement>document.getElementById("DropdownOptions2")).value
    if (this.trie2 != newtrie){
      if (newtrie=="Les moins bien notés"){
        this.allMauvaisPlan = this.allMauvaisPlan?.sort((a : Bonplan , b : Bonplan) =>
        (this.moyenneTableau(a.note) < this.moyenneTableau(b.note)) ? -1 : 1)    
      }else{
        this.allMauvaisPlan = this.allMauvaisPlan?.sort((a : Bonplan , b : Bonplan) =>
        (a.date > b.date) ? -1 : 1)
      }
      this.trie2 = newtrie
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
