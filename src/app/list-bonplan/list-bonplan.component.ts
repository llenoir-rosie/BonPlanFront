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

@Component({
  selector: 'app-list-bonplan',
  templateUrl: './list-bonplan.component.html',
  styleUrls: ['list-bonplan.component.css'],
})
export class ListBonplanComponent implements OnInit {

pop() {
throw new Error('Method not implemented.');
}
  ville: Ville|undefined;
  bp: Bonplan[]=[];
  mp: Mauvaisplan[]=[];
  imgBackGround: String;
  nomdelaville: String;
  nomdelactivite: String;
  public listeBonPlan: Bonplan[];
  public listeMauvaisPlan: Mauvaisplan[];
  bonplanDeleted: Boolean = false;
  mauvaisplanDeleted: Boolean = false;
  allowUserRight: boolean;
  allowModeratorRight: boolean;
  currentUser: String;
  currentImg: String;
  currentVille: String;
  currentActivite: String;
  newBP: Bonplan;
  allBonPlan: Bonplan[];
  allMauvaisPlan: Bonplan[];


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
    this.http.get<Bonplan[]>("http://localhost:8080/" + nomdelaville + "/" + nomdelactivite + "/bonplan").subscribe((data) => {
      // trie les bons plans en fonction de la note moyenne des utilisateurs
      this.listeBonPlan = data.sort((a,b) => Number(this.moyenneTableau(b.note)) - Number(this.moyenneTableau(a.note)));
      this.allBonPlan = this.listeBonPlan.filter(el => Number(this.moyenneTableau(el.note)) > 2);
      this.allMauvaisPlan = this.listeBonPlan.filter(el => Number(this.moyenneTableau(el.note)) <= 2).reverse();
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

  public noteClick(note:String, bpNote: Number[], bpName: String, bpAdress: String) {
    // console.log('Number(note)', Number(note), 'bpNote', bpNote);
    let nouvelleNote : Number[] = bpNote;
    nouvelleNote.push(Number(note));
    this.newBP = new Bonplan(this.nomdelaville, this.nomdelactivite, bpName, bpAdress, localStorage.getItem('currentUser')!,
    nouvelleNote);

    this.http.put("http://localhost:8080/" + this.nomdelaville + "/" + this.nomdelactivite + "/updatebonplan", this.newBP).subscribe(
    () => {
      this.getAllBonPlan(this.nomdelaville, this.nomdelactivite);
    })
  }

}
