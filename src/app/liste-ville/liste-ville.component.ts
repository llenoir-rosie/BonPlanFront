import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Ville } from '../ville';
import { HttpClient } from '@angular/common/http';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Router } from '@angular/router';

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
  activeUIIndex = 1;
  public listVille: Ville[];

  constructor(private router: Router, private http: HttpClient, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
  };

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
  }
}
