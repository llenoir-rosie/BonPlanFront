import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
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
  currentUser: String;
  currentImg: String;
  currentVille: String;
  allowConnection: Boolean;
  currentActivite: String;
  public searchInput: String = '';

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.changeImgNav();
    this.http.get<Ville[]>('http://localhost:8080/cities').subscribe((data) => {
      this.Villeslist = data;
    })  
    this.IsUserIsAuth();
  }

  IsUserIsAuth() {
    if (localStorage.getItem("currentUser") == null) {
      this.allowConnection = true
    } else {
      this.currentUser = localStorage.getItem("currentUser")!;
      this.allowConnection = false
    }
  }
  
  goToVilleActivite(ville: Ville) {
    this.router.navigate(['/ville', ville.name]);
  }

  login() {
    this.router.navigate(['/login'])
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
  
  changeImgNav() { // cette fonction est activée dès qu'on clicke dans le body et à l'initialisation
    // si on se trouve sur la page d'accueil, l'image de fond de la navbar est celle par défaut et il n'y a pas de nom de ville
    if(location.href == "http://localhost:4200/#"){
      this.currentImg = "./assets/img/activite-navbar.jpeg";
      localStorage.setItem('currentImg', "./assets/img/activite-navbar.jpeg");
      this.currentVille = "";
      localStorage.setItem('currentVille', "");
      this.currentActivite = "";
      localStorage.setItem('currentActivite', "");
    // change l'image et le nom de la ville de la navbar selon la ville où l'on est grâce au localStorage
    }else {
      this.currentImg = localStorage.getItem("currentImg")!;
      this.currentVille = localStorage.getItem("currentVille")!;
      this.currentActivite = localStorage.getItem("currentActivite")!;
    }
  }
  gotToMyAccount(currentUser: String) {
    this.router.navigate(['/account', currentUser])
  }

  goToDetail(ville: Ville) {
    this.router.navigate(['/ville', ville.name]);

    // change la valeur de la currentImg de localStorage par l'image de la ville où on est
    localStorage.setItem("currentImg", ville.image.toString());
    this.currentImg = localStorage.getItem("currentImg")!;

    // change la valeur de la currentVille de localStorage par le nom de la ville où on est
    localStorage.setItem('currentVille', "\xa0" + "à " + ville.name);
    this.currentVille = localStorage.getItem("currentVille")!;

    localStorage.setItem('currentActivite', "");
    this.currentActivite = localStorage.getItem("")!;
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


  SearchEnter(){
    this.goToDetail(this.touteVille[0])
  }

}
