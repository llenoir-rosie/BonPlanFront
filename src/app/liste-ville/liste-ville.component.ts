import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VILLE } from '../mock-ville-list';
import { Ville } from '../ville';

@Component({
  selector: 'app-liste-ville',
  templateUrl: './liste-ville.component.html',
})
export class ListeVilleComponent {
  listVille: Ville[] = VILLE;

  constructor(private router: Router) {}
   
  goToVilleActivite(ville: Ville) {
      this.router.navigate(['/ville', ville.name])
    }
  
}
