import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Activite } from 'src/app/activite';
import { Bonplan } from 'src/app/bonplan';
import { BONPLAN } from 'src/app/mock-bonplan-list';
import { Ville } from 'src/app/ville';

@Component({
  selector: 'app-bonplan-form',
  templateUrl: './bonplan-form.component.html',
})


export class BonplanFormComponent implements OnInit{
  @Input() bonplan: Bonplan[]=BONPLAN;
  ville: Ville[];
  longueur: number
  activite: Activite
  
  constructor( private router: Router) {}
  ngOnInit() {
      
    console.log(this.ville,this.activite)
  }
  onSubmit(){
    console.log(this.bonplan[0], this.bonplan[1])
    this.router.navigate(['ville']) //,ville.name,act.name
    let longueur = this.bonplan.length
    console.log(longueur)

  }
  
}
