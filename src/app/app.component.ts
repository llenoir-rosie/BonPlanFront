import { Component, OnInit } from '@angular/core';
import { Ville } from './ville';
import { VILLE } from './mock-ville-list';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  listVille: Ville[] = VILLE;

  ngOnInit() {
    console.table(this.listVille)
  }
}
