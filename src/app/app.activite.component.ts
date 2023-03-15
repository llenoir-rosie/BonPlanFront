import { Component, OnInit } from '@angular/core';
import { Activite } from './activite/activite';
import { ACTIVITE } from './activite/mock-activite-list';

@Component({
  selector: 'app-root2',
  templateUrl: 'app.activite.component.html',
  styles: []
})
export class AppComponentActivite implements OnInit {
  listActivite: Activite[] = ACTIVITE;

  ngOnInit() {
    console.table(this.listActivite)
  }
}
