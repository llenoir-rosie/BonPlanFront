import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Ville } from '../ville';

// npm install swiper
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { PageScrollService } from 'ngx-page-scroll-core';
import { Activite } from '../activite';
import { _getOptionScrollPosition } from '@angular/material/core';
import { AppComponent } from "../app.component";
import { Commentary } from '../Commentary'; // ça marche même si y'a une erreur
import { MatDialog } from '@angular/material/dialog';
import { cityactivities } from "../cityactivity";
import { Bonplan } from "../bonplan";
import { UserBonPlanComponent } from '../user-profile/user-bonplan.component';
// import { BonPlanNote } from '../bonplan_note';
// import { CommaExpr } from '@angular/compiler';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-liste-ville',
  templateUrl: './liste-ville.component.html',
  styleUrls: ['liste-ville.component.css'],
})

export class ListeVilleComponent implements OnInit{
  public listVille: Ville[];
  public listActivities: Activite[];
  currentImg: String;
  currentVille: String;
  currentActivite: String;
  activeUIIndex = 1;
  scroll_y = 0;
  randomCommentaries: Commentary[];
  randomCommentariesString: String[];
  randomUserString: String[];

  constructor(private router: Router, private http: HttpClient, private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any, private appComponent: AppComponent, private dialog : MatDialog, public userBonPlan : UserBonPlanComponent) {}
  
  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any){
    this.scroll_y = scrollY;
    }

  ngOnInit() {
    this.getAllCities();
    this.getAllActivities();
    this.getAleaCommentaries();
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
    this.appComponent.ngOnInit();
    this.userBonPlan.ngOnInit();
  }

  public getAleaCommentaries() {
    this.randomCommentaries = [];
    this.randomCommentariesString = [];
    this.randomUserString = [];
    this.http.get<Commentary[]>("http://localhost:8080/commentaries").subscribe((data) => {
      this.randomCommentaries = data; 
      for (let i = 0; i < 5; i++) {
        let j = Math.floor(Math.random() * this.randomCommentaries.length)
        this.randomCommentariesString.push(this.randomCommentaries[j].commentaires);
        this.randomUserString.push(this.randomCommentaries[j].userName)
      }
    })
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

public getAllActivities() {
  this.http.get<Activite[]>('http://localhost:8080/activities').subscribe((data) => {
    this.listActivities = data;
  })
}

public goToVille(activity: Activite) {
  this.router.navigate(['/activity', activity.name])

  // sessionStorage.setItem('currentImg', activity.image.toString());
  // this.currentImg = sessionStorage.getItem("currentImg")!;

  // sessionStorage.setItem('currentActivite', "\xa0"  +  activity.name.toString());
  // this.currentActivite = sessionStorage.getItem("currentActivite")!;

}

goToVilleActivite(ville: Ville) {
    this.router.navigate(['/ville', ville.name])

    // // on change la valeur de currentImg à celle de l'image correspondant à la ville actuelle dans sessionStorage
    // sessionStorage.setItem('currentImg', ville.image.toString());
    // this.currentImg = sessionStorage.getItem("currentImg")!;

    // // on change la valeur de currentVille à celle du nom de la ville actuelle dans sessionStorage
    // sessionStorage.setItem('currentVille', "\xa0" + "à " + ville.name);
    // this.currentVille = sessionStorage.getItem("currentVille")!;
  }
  
}
