import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-bonplan',
  templateUrl: './list-bonplan.component.html',
  styles: [
  ]
})
export class ListBonplanComponent {

  constructor(private route: ActivatedRoute, private router: Router) { }
  
  goToVillePrecision() {
    this.router.navigate(['/ville/lyon/bonplan/precision']);
  }
}
