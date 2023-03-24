import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['base-page.css'],
})
export class AppComponent {

  constructor(private router: Router, private http: HttpClient) {}

  registration() {
    this.router.navigate(['/registration'])
  }
}

