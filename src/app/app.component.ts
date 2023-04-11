import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';
import { Ville } from './ville';
import { User } from './User';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent implements OnInit {
  touteVille: Ville[] = [];
  Villeslist: Ville[] = [];
  logIn: Boolean = false;
  commonUser = new User("","","","", "", "COMMON")
  currentUser: User;
  currentImg: String;
  currentVille: String;
  constructor(private router: Router, private http: HttpClient) { }
  

  goToVilleActivite(ville: Ville) {
    this.router.navigate(['/ville', ville.name]);

  }


  login() {
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    // this.logCurrentUser();
    this.changeImgNav();

    this.http.get<Ville[]>('http://localhost:8080/cities').subscribe((data) => {
      this.Villeslist = data;
    })  
    
  }
  // logCurrentUser() {
  //   if (localStorage.getItem('currentUser["role"]') == null || localStorage.getItem('currentUser["role"]') == 'COMMON') {
  //     localStorage.setItem("currentUser", JSON.stringify(this.commonUser));
  //   }
  // }
  
  changeImgNav() { // cette fonction est activée dès qu'on clicke dans le body
    // si on se trouve sur la page d'accueil, l'image de fond de la navbar est celle par défaut et il n'y a pas de nom de ville
    if(location.href == "http://localhost:4200/#"){
      this.currentImg = "./assets/img/activite-navbar.jpeg";
      localStorage.setItem('currentImg', "./assets/img/activite-navbar.jpeg");
      localStorage.setItem('currentVille', "");
      this.currentVille = "";
    // change l'image et le nom de la ville de la navbar selon la ville où l'on est grâce au localStorage
    }else {
      this.currentImg = localStorage.getItem("currentImg")!;
      this.currentVille = localStorage.getItem("currentVille")!;
    }
  }


  goToDetail(ville: Ville) {
    this.router.navigate(['/ville', ville.name]);

    // change la valeur de la currentImg de localStorage par l'image de la ville où on est
    localStorage.setItem("currentImg", '{{ville.image}}');
    this.currentImg = localStorage.getItem("currentImg")!;

    // change la valeur de la currentVille de localStorage par le nom de la ville où on est
    localStorage.setItem('currentVille'," de " + ville.name);
    this.currentVille = localStorage.getItem("currentVille")!;
  }


  SearchVille(toSearch: string){
    this.touteVille =[]
    if(toSearch.length <= 1){
      return of([]);
    }
    else{
      for (const i in this.Villeslist){
        if (this.Villeslist[i].name.toLowerCase().includes(toSearch.toLowerCase())){
          this.touteVille.push(this.Villeslist[i]) ;
        }
      }
    }
    return this.touteVille;
  }

}

