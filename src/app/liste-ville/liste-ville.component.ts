import { Component } from '@angular/core';
import { VILLE } from '../mock-ville-list';
import { Ville } from '../ville';

@Component({
  selector: 'app-liste-ville',
  templateUrl: './liste-ville.component.html',
})
export class ListeVilleComponent {
  listVille: Ville[] = VILLE;
}
