import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VILLE } from '../mock-ville-list';
import { Ville } from '../ville';

@Component({
  selector: 'app-liste-activite',
  templateUrl: './liste-activite.component.html',
})
export class ListeActiviteComponent implements OnInit {

  villeList: Ville[];
  ville: Ville|undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.villeList = VILLE;
    const villeName: string|null = this.route.snapshot.paramMap.get('ville.name');

    if(villeName) {
      this.ville = this.villeList.find(ville => ville.name == villeName)
    }
    

  }

}
