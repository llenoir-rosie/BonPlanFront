import { Component, OnInit } from '@angular/core';
import { Ville } from './ville/ville';
import { VILLE } from './ville/mock-ville-list';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  listVille: Ville[] = VILLE;
  VilleSelected: Ville;
  ngOnInit() {
    console.table(this.listVille)
    this.selectVille(this.listVille[0])
  }

  selectVille(villeName: Ville) {
    console.log(`Vous avez cliqué sur la ville ${villeName.name}`);
  }
}
