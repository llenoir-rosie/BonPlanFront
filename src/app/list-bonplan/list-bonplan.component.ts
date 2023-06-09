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
    this.getAllMauvaisPlan(this.nomdelaville, this.nomdelactivite);
    this.getImgActivity(this.nomdelactivite);

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

    localStorage.setItem("currentVille"," à " + this.nomdelaville.toString());
    localStorage.setItem("currentActivite", "\xa0"  + this.nomdelactivite.toString());
  }



  //"attrape" les bons et les mauvais plans en foncion de la ville et de l'activité où l'on est
  public getAllBonPlan(nomdelaville: String, nomdelactivite: String) {
    this.http.get<Bonplan[]>("http://localhost:8080/" + nomdelaville + "/" + nomdelactivite + "/bonplan").subscribe((data) => {
      this.listeBonPlan = data;
    })
  }
  public getAllMauvaisPlan(nomdelaville: String, nomdelactivite: String) {
    this.http.get<Mauvaisplan[]>("http://localhost:8080/" + nomdelaville + "/" + nomdelactivite + "/mauvaisplan").subscribe((data) => {
      this.listeMauvaisPlan = data;
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
      this.http.get<Bonplan[]>("http://localhost:8080/" + this.nomdelaville + "/" + this.nomdelactivite + "/bonplan").subscribe((data) => {
        this.listeBonPlan = data;
      })
    });
    this.bonplanDeleted = true;
  }
  public deleteMauvaisPlan(mpName: String) {
    //supprime l'objet mauvais plan
    this.http.delete<String>(`http://localhost:8080/${this.nomdelaville}/${this.nomdelactivite}/${mpName}/deletemauvaisplan`).subscribe(() => {
    //refais une requête get vers la bdd pour avoir la liste des mauvais plans sans le mp venant d'être supprimé => permet de refresh la page
      this.http.get<Mauvaisplan[]>("http://localhost:8080/" + this.nomdelaville + "/" + this.nomdelactivite + "/mauvaisplan").subscribe((data) => {
        this.listeMauvaisPlan = data;
      })
    });
    this.mauvaisplanDeleted = true;
  }

  // Formulaire de création de bons plans / mauvais plans
  public updateBonPlan(bp: Bonplan) {
    this.dialogRef.open(PopUpComponentUpdateBonPlan, {
      width: '600px',
      height: '600px',
      data: {
        nameCity: this.nomdelaville,
        nameActivity:this.nomdelactivite,
        bp: bp 
      }
    }).afterClosed().subscribe(() => this.getAllBonPlan(this.nomdelaville, this.nomdelactivite));
  }

  public updateMauvaisPlan(mp: Mauvaisplan) {
    this.dialogRef.open(PopUpComponentUpdateMauvaisPlan, {
      width: '600px',
      height: '600px',
      data: {
        nameCity: this.nomdelaville,
        nameActivity:this.nomdelactivite,
        mp: mp 
      }
    }).afterClosed().subscribe(() => this.getAllMauvaisPlan(this.nomdelaville, this.nomdelactivite));
  }

  public goToFormAddBonPlan() {
    this.dialogRef.open(PopUpComponentAddBonPlan, {
      width: '600px',
      height: '600px',
      data: {
        nameCity: this.nomdelaville,
        nameActivity:this.nomdelactivite 
      }
    }).afterClosed().subscribe(() => this.getAllBonPlan(this.nomdelaville, this.nomdelactivite));
  }
  public goToFormAddMauvaisPlan() {
    this.dialogRef.open(PopUpComponentAddMauvaisPlan, {
      width: '600px',
      height: '600px',
      data: {
        nameCity: this.nomdelaville,
        nameActivity:this.nomdelactivite 
      }
    }).afterClosed().subscribe(() => this.getAllMauvaisPlan(this.nomdelaville, this.nomdelactivite));
  }
  
  // goToVillePrecision(ville: Ville, act: Activite, bp: Bonplan) {
  //   this.router.navigate(['/ville', ville.name, act.name, bp.name])
  // }
  // soumettreForm(test: string){
  //   console.log(test)
  // }
  // CreNouveauBonPlan(ville: String, act: String) {
  //   console.log(document.getElementById("test"),)
  // }
  // goToedit(ville: String, act: String){
  //   this.router.navigate(['/edit/bonplan'])

  // }

  public noteClick(note:String, bpNote: number, bpNbNote: number, bpName: String, bpAdress: String) {
    let nouvelleNote : number;
    let nouveauNbNote : number;
    nouvelleNote = (bpNote * bpNbNote + Number(note))/(bpNbNote + 1);
    nouveauNbNote = bpNbNote + 1;

    this.newBP = new Bonplan(this.nomdelaville, this.nomdelactivite, bpName, bpAdress, localStorage.getItem('currentUser')!,
    nouvelleNote , nouveauNbNote);

    this.http.put("http://localhost:8080/" + this.nomdelaville + "/" + this.nomdelactivite + "/updatebonplan", this.newBP).subscribe
    (() => {
      this.http.get<Bonplan[]>("http://localhost:8080/" + this.nomdelaville + "/" + this.nomdelactivite + "/bonplan").subscribe((data) => {
      this.listeBonPlan = data;
    })
      })
  }

  // public updateBonPlanNote(bpName: String) {

  //   this.newBP = new Bonplan(this.nomdelaville, this.nomdelactivite, bpName, this.updateBPForm.value.address, localStorage.getItem('currentUser')!,0 ,0);
  //   console.log(this.newBP)
  //   this.http.put("http://localhost:8080/" + this.nomdelaville + "/" + this.nomdelactivite + "/updatebonplan", this.newBP).subscribe((data) => {
    
  // })
    
  // }
}
