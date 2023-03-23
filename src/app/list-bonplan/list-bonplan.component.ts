import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activite } from '../activite';
import { Bonplan } from '../bonplan';
// import { ACTIVITE } from '../mock-activite-list';
import { BONPLAN } from '../mock-bonplan-list';
import { VILLE } from '../mock-ville-list';
import { Ville } from '../ville';

@Component({
  selector: 'app-list-bonplan',
  templateUrl: './list-bonplan.component.html',
  styles: [
  ]
})
export class ListBonplanComponent implements OnInit {
  villeList: Ville[] = VILLE;
  bpList: Bonplan[]=BONPLAN;
  ville: Ville|undefined;
  bp: Bonplan[]=[];
  nomdelaville: String;
  nomdelactivite: String;
  public listeBonPlan: Bonplan[];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    const villeName: string|null = this.route.snapshot.paramMap.get('name');
    this.nomdelaville = (villeName+'').charAt(0).toUpperCase()+villeName?.substr(1);

    const activiteName: string|null = this.route.snapshot.paramMap.get('activity.name');
    this.nomdelactivite = activiteName+'';
    // (activiteName+'').charAt(0).toUpperCase()+activiteName?.substr(1);

    this.getAllBonPlan(this.nomdelaville, this.nomdelactivite);

    this.bpList.forEach(element => {
      if (element.ville_name === this.nomdelaville && element.activity_type === this.nomdelactivite){
        this.bp.push(element)
      }
      console.log(this.bpList);
    });

  }

  public getAllBonPlan(nomdelaville: String, nomdelactivite: String) {
    this.http.get<Bonplan[]>("http://localhost:8080/" + nomdelaville + "/" + nomdelactivite + "/bonplan").subscribe((data) => {
    this.listeBonPlan = data;
    })
  }
  
  goToVillePrecision(ville: Ville, act: Activite, bp: Bonplan) {
    this.router.navigate(['/ville', ville.name, act.name, bp.name])
  }
  soumettreForm(test: string){
    console.log(test)
  }
  CreNouveauBonPlan(ville: String, act: String) {
    console.log(document.getElementById("test"),)
  }
  goToedit(ville: String, act: String){
    this.router.navigate(['/edit/bonplan'])

  }
}
