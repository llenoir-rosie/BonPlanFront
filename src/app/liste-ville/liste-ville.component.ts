import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Ville } from '../ville';

// npm install swiper
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { PageScrollService } from 'ngx-page-scroll-core';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-liste-ville',
  templateUrl: './liste-ville.component.html',
  styleUrls: ['liste-ville.component.css'],
})
export class ListeVilleComponent implements OnInit{
  public listVille: Ville[];
  currentImg: String;
  currentVille: String;
  activeUIIndex = 1;

  constructor(private router: Router, private http: HttpClient, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {}
  
  ngOnInit() {
    this.getAllCities();
    var swiper = new SwiperCore(".mySwiper2", {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    var swiper2 = new SwiperCore(".mySwiper2", {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
scrollCustomImplementation(element: HTMLElement, index:any) {
  this.pageScrollService.scroll({
  document: this.document,
  scrollTarget: element,
  });
  this.activeUIIndex = index;
}

public getAllCities() {
  this.http.get<Ville[]>('http://localhost:8080/cities').subscribe((data) => {
    this.listVille = data;
  })        
}

  goToVilleActivite(ville: Ville) {
      this.router.navigate(['/ville', ville.name])
      // on change la valeur de currentImg à celle de l'image correspondant à la ville actuelle dans localStorage
      localStorage.setItem('currentImg', ville.image);
      this.currentImg = localStorage.getItem("currentImg")!;

      // on change la valeur de currentVille à celle du nom de la ville actuelle dans localStorage
      localStorage.setItem('currentVille', " de " + ville.name);
      this.currentVille = localStorage.getItem("currentVille")!;
    }
  
}
