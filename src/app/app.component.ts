import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';
import { Ville } from './ville';
import { User } from './User';

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
  constructor(private router: Router, private http: HttpClient) { }
  

  goToVilleActivite(ville: Ville) {
    this.router.navigate(['/ville', ville.name]);

  }


  login() {
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    localStorage.setItem("currentImg", JSON.stringify("./assets/img/activite-navbar.jpeg"));
    this.currentImg = JSON.parse(localStorage.getItem("currentImg")!);
    this.http.get<Ville[]>('http://localhost:8080/cities').subscribe((data) => {
      this.Villeslist = data;
    })  
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")!);
    localStorage.setItem("currentUser", JSON.stringify(this.commonUser));
  }

  changeImgNav() { // cette fonction est activée dès qu'on clicke quelque part
    if(location.href == "http://localhost:4200/ville"){
      this.currentImg = "./assets/img/activite-navbar.jpeg";
    } // si on se trouve sur la page d'accueil, l'image de fond de la navbar est celle par défaut
    else {
      this.currentImg = localStorage.getItem("currentImg")!;
      // change l'image de la navbar selon la ville où l'on est grâce au localStorage
    }
  }


  // search(term: string) {
  //   this.SearchVille(term);
  //   // this.searchTerms.next(term);
  // }

  goToDetail(ville: Ville) {
    this.router.navigate(['/ville', ville.name]);
    localStorage.setItem('currentImg', ville.image);
    this.currentImg = localStorage.getItem("currentImg")!;
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

