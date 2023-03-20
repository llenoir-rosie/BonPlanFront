import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activite } from '../activite';
import { Bonplan } from '../bonplan';
import { ACTIVITE } from '../mock-activite-list';
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
  activiteList:Activite[];
  villeList: Ville[];
  bpList: Bonplan[]=BONPLAN;
  


  ville: Ville|undefined;
  activite: Activite|undefined;
  bp: Bonplan[]=[];



  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {



    this.villeList = VILLE;
    this.activiteList = ACTIVITE;

    const villeName: string|null = this.route.snapshot.paramMap.get('ville.name');
    let nomdelaville = (villeName+'').charAt(0).toUpperCase()+villeName?.substr(1)

    this.ville = this.villeList.find(ville => ville.name == nomdelaville);

    const activiteName: string|null = this.route.snapshot.paramMap.get('activite.name');
    let nomdelactivite = (activiteName+'').charAt(0).toUpperCase()+activiteName?.substr(1)


    this.activite = this.activiteList.find(activite => activite.name == nomdelactivite)
    this.bpList.forEach(element => {
      if (element.nameville,element.nameactivite === nomdelaville,nomdelactivite){
        this.bp.push(element)

  }});
  console.log(activiteName)
  console.log(nomdelactivite)
  console.log(this.bp)
  console.log(this.villeList)
  console.log(this.bpList)
}
  goToVillePrecision(ville: Ville, act: Activite, bp: Bonplan) {
    this.router.navigate(['/ville', ville.name, act.name, bp.name])
  }
}
