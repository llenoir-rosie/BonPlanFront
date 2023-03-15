import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VILLE } from '../mock-ville-list';
import { Ville } from '../ville';

@Component({
  selector: 'app-list-ville',
  templateUrl: './list-ville.component.html',
})
export class ListVilleComponent {
  listVille: Ville[] = VILLE;
  
  constructor(private router: Router) {}

  selectVille(villeName: Ville) {
    this.router.navigate(['/ville', villeName.name])
  }
}
