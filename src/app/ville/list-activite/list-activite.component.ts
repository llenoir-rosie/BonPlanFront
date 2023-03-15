import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activite } from 'src/app/activite/activite';
import { ACTIVITE } from 'src/app/activite/mock-activite-list';
//import { VILLE } from '../mock-ville-list';
//import { Ville } from '../ville';



@Component({
  selector: 'app-list-activite',
  templateUrl: './list-activite.component.html',
})
export class ListActiviteComponent {
  ListActivite: Activite[];
  activite: Activite|undefined;
  //VilleList: Ville[];
  //ville: Ville|undefined;


  constructor(private router: ActivatedRoute) {}

  //ngOnInit() {
  //  this.ListActivite = ACTIVITE;
  //  const villeName: string|null = this.router.snapshot.paramMap.get('name');
 //   if(villeName) {
  //    this.ville=this.VilleList.find(ville => ville.name == villeName)
  //  } 
 // }

}
