import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activite } from '../activite';
import { ACTIVITE } from '../mock-activite-list';
import { VILLE } from '../mock-ville-list';
import { Ville } from '../ville';

@Component({
  selector: 'app-liste-activite',
  templateUrl: './liste-activite.component.html',
})
export class ListeActiviteComponent implements OnInit {
  activiteList:Activite[]=ACTIVITE;
  villeList: Ville[];  
  
  ville: Ville|undefined;
  activite: Activite[]=[] ;
  

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.villeList = VILLE;
    const villeName: string|null = this.route.snapshot.paramMap.get('ville.name');
    let nomdelaville = (villeName+'').charAt(0).toUpperCase()+villeName?.substr(1)

    this.ville = this.villeList.find(ville => ville.name == nomdelaville)
    this.activiteList.forEach(element => {
      if (element.nameville === nomdelaville){
        this.activite.push(element)
      }
      
    });
    // this.activite = this.activiteList.find(activite => activite.nameville == nomdelaville)
    // console.log(this.activite)

  }
  goToVilleList() {
    this.router.navigate(['/ville']);
  }
   
  goToVilleActiviteBonplan(ville: Ville, act: Activite) {
      this.router.navigate(['/ville/', ville.name, act.name])

    }

}
