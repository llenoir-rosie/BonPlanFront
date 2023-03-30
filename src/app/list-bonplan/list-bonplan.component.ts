import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bonplan } from '../bonplan';
import { BONPLAN } from '../mock-bonplan-list';
import { VILLE } from '../mock-ville-list';
import { Ville } from '../ville';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponentAddBonPlan } from './pop-up-addBonPlan';

@Component({
  selector: 'app-list-bonplan',
  templateUrl: './list-bonplan.component.html',
  styleUrls: ['list-bonplan.component.css'],
})
export class ListBonplanComponent implements OnInit {
  villeList: Ville[] = VILLE;
  bpList: Bonplan[]=BONPLAN;
  ville: Ville|undefined;
  bp: Bonplan[]=[];
  imgBackGround: String;
  nomdelaville: String;
  nomdelactivite: String;
  public listeBonPlan: Bonplan[];
  bonplanDeleted: Boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private dialogRef: MatDialog) { }

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
  }

  public getAllBonPlan(nomdelaville: String, nomdelactivite: String) {
    this.http.get<Bonplan[]>("http://localhost:8080/" + nomdelaville + "/" + nomdelactivite + "/bonplan").subscribe((data) => {
      this.listeBonPlan = data;
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
}
