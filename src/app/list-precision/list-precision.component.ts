import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-precision',
  templateUrl: './list-precision.component.html',
  styles: [
  ]
})
export class ListPrecisionComponent {
  
  constructor(private route: ActivatedRoute, private router: Router) { }
  goToVilleList() {
    this.router.navigate(['/ville']);
  }
}
