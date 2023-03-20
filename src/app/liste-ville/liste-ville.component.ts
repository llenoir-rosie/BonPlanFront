import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Ville } from '../ville';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-liste-ville',
  templateUrl: './liste-ville.component.html',
  styleUrls: ['liste-ville.component.css'],
})
export class ListeVilleComponent implements OnInit{
  public listVille: Ville[];

  constructor(private router: Router, private http: HttpClient) {}
  
  ngOnInit() {
    this.getAllCities();
  }
public getAllCities() {
  this.http.get<Ville[]>('http://localhost:8080/cities').subscribe((data) => {
    this.listVille = data;
  })        
}

  goToVilleActivite(ville: Ville) {
      this.router.navigate(['/ville', ville.name])
    }
  
}
