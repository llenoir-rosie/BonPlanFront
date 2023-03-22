import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VILLE } from '../mock-ville-list';
import { Ville } from '../ville';

@Component({
  selector: 'app-liste-activite',
  templateUrl: './liste-activite.component.html',
})
export class ListeActiviteComponent implements OnInit {
  villeList: Ville[];
  ville: Ville|undefined;
  

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
    this.villeList = VILLE;
    const villeName: string|null = this.route.snapshot.paramMap.get('ville.name');
    let nomdelaville = (villeName+'').charAt(0).toUpperCase()+villeName?.substr(1)

    this.ville = this.villeList.find(ville => ville.name == nomdelaville)
  }

  goToVilleList() {
    this.router.navigate(['/ville']);
  }
   
  goToVilleActiviteBonplan(ville: Ville) {
      this.router.navigate(['/ville/', ville.name,'bonplan'])

    }
  
}
