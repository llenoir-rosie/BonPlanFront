import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activite } from '../activite';
import { Bonplan } from '../bonplan';
import { Ville } from '../ville';

@Component({
  selector: 'app-list-bonplan',
  templateUrl: './list-bonplan.component.html',
  styles: [
  ]
})
export class ListBonplanComponent implements OnInit {
<<<<<<< HEAD
=======
  activiteList:Activite[];
  villeList: Ville[];
  bpList: Bonplan[]=BONPLAN;
  
  


>>>>>>> frontfthibault
  ville: Ville|undefined;
  activite: Activite|undefined;
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
  }
    public getAllBonPlan(nomdelaville: String, nomdelactivite: String) {
      this.http.get<Bonplan[]>("http://localhost:8080/" + nomdelaville + "/" + nomdelactivite + "/bonplan").subscribe((data) => {
        this.listeBonPlan = data;
    })
  }

<<<<<<< HEAD
=======
    this.villeList = VILLE;
    this.activiteList = ACTIVITE;

    const villeName: string|null = this.route.snapshot.paramMap.get('ville.name');
    const activiteName: string|null = this.route.snapshot.paramMap.get('act.name');
    let nomdelaville = (villeName+'').charAt(0).toUpperCase()+villeName?.substr(1)
    let nomdelactivite = (activiteName+'').charAt(0).toUpperCase()+activiteName?.substr(1)

    this.ville = this.villeList.find(ville => ville.name == nomdelaville);
    this.activite = this.activiteList.find(activite => activite.nameville == nomdelaville)
    
    
    this.bpList.forEach(element => {
      if (element.nameville === nomdelaville && element.nameactivite === nomdelactivite){
        this.bp.push(element)

  }});
  




}
>>>>>>> frontfthibault
  goToVillePrecision(ville: Ville, act: Activite, bp: Bonplan) {
    this.router.navigate(['/ville', ville.name, act.name, bp.name])
  }
  soumettreForm(test: string){
    console.log(test)
  }
  CreNouveauBonPlan(ville: Ville, act: Activite) {
    console.log(document.getElementById("test"),)
  }
  goToedit(ville: Ville, act: Activite){
    console.log(ville.name,act.name)
    this.router.navigate(['/edit/bonplan'])

  }
}
