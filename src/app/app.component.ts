import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';
import { Ville } from './ville';
import { User } from './User';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Activite } from './activite';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent implements OnInit{
  touteVille: Ville[] = [];
  Villeslist: Ville[] = [];

  allActivities: Activite[] = [];
  Activitieslist: Activite[] = [];

  logIn: Boolean = false;
  commonUser = new User("","","","", "", "COMMON")
  currentUser: String;
  public nomdelaville: String;
  currentImg: String;
  currentVille: String;
  allowConnection: Boolean;
  currentActivite: String;
  public searchInput: String = '';
  initial_username : String;
  location_url : String;

  //search variable 
  researcheBy: string;
  searchArray: string[] = ['Recherche par Ville', 'Recherche par Activité']

  //boolean for searchVille or searchActivities input
  isCityActivated: boolean;
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }
  
  goToVilleActivite(ville: Ville) {
    this.router.navigate(['/ville', ville.name]);
  }


  login() {
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    // this.logCurrentUser();
    this.isCityActivated = true;
    (<HTMLInputElement>document.getElementById("switch")).checked = false; // remet le switch sur 'recherche par ville'
    this.researcheBy = this.searchArray[0]
    this.changeImgNav();

    this.http.get<Ville[]>('http://localhost:8080/cities').subscribe((data) => {
      this.Villeslist = data;
    })
    this.http.get<Activite[]>('http://localhost:8080/activities').subscribe((data) => {
       this.Activitieslist = data;
    }) 
    this.IsUserIsAuth();

    this.location_url = location.href;
  }

  IsUserIsAuth() {
    if (sessionStorage.getItem("currentUser") == null) {
      this.allowConnection = true
    } else {
      this.currentUser = sessionStorage.getItem("currentUser")!;
      this.allowConnection = false
      this.initial_username = (this.currentUser)
    }
  }
  
  // permet de "reset" la navbar et de déconnecter l'utilisateur lorsqu'on ferme l'onglet du site
  // @HostListener('window:beforeunload') onBeforeUnload() {
  //   sessionStorage.removeItem("currentActivite");
  //   sessionStorage.removeItem("currentVille");
  //   sessionStorage.setItem("currentImg", "");
    // sessionStorage.removeItem('currentUser');
    // sessionStorage.removeItem('currentUserRole');
    // sessionStorage.removeItem('token');
    // 
    // }


  // @HostListener('window:popstate') onPopState() {

  //   const routeParams = this.route.snapshot.params;
  //   this.route.params.subscribe(routeParams => {
  //     this.nomdelaville = routeParams['name'];
  //     // this.listeVillesComponent.getAllCities(routeParams['name']);
  //   })
  //   console.log('pop', routeParams['name'])
  // }

  // logCurrentUser() {
  //   if (sessionStorage.getItem('currentUser["role"]') == null || sessionStorage.getItem('currentUser["role"]') == 'COMMON') {
  //     sessionStorage.setItem("currentUser", JSON.stringify(this.commonUser));
  //   }
  // }

  logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUserRole');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
  changeImgNav() { // cette fonction est activée à l'initialisation 
    // si on se trouve sur la page d'accueil, l'image de fond de la navbar est celle par défaut et il n'y a pas de nom de ville
    if(location.href == "http://localhost:4200/ville") {
      this.currentImg = "";
      sessionStorage.setItem('currentImg', "");
      this.currentVille = "";
      sessionStorage.setItem('currentVille', "");
      this.currentActivite = "";
      sessionStorage.setItem('currentActivite', "");
    // change l'image et le nom de la ville de la navbar selon la ville où l'on est grâce au sessionStorage
    }
    else {
      this.currentImg = sessionStorage.getItem("currentImg")!;
      this.currentVille = sessionStorage.getItem("currentVille")!;
      this.currentActivite = sessionStorage.getItem("currentActivite")!;
    }    
    
  }
  gotToMyAccount(currentUser: String) {
    this.router.navigate(['/account', currentUser])
  }

  goToUserProfile(currentUser: String){
    this.router.navigate(['/profile', currentUser])
  }

  goToUserBonPlan(currentUser:String){
    this.router.navigate(['/userbonplans',currentUser])
  }

  goToUserMauvaisPlan(currentUser:String){
    this.router.navigate(['/usermauvaisplans',currentUser])
  }

  goToDetailVille(ville: Ville) {
    this.router.navigate(['/ville', ville.name]);

    // change la valeur de la currentImg de sessionStorage par l'image de la ville où on est
    sessionStorage.setItem("currentImg", ville.image.toString());
    this.currentImg = sessionStorage.getItem("currentImg")!;

    // change la valeur de la currentVille de sessionStorage par le nom de la ville où on est
    sessionStorage.setItem('currentVille', "\xa0" + "à " + ville.name);
    this.currentVille = sessionStorage.getItem("currentVille")!;

    // enlève la currentActivité
    sessionStorage.setItem('currentActivite', "");
    this.currentActivite = sessionStorage.getItem("")!;
  }

  goToDetailActivity(act: Activite) {
    this.router.navigate(['/activity', act.name])
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

  SearchActivity(toSearch: string){
    this.allActivities =[]
    if(toSearch.length <= 1){
      return of([]);
    }
    else{
      for (const i in this.Activitieslist){
        if (this.Activitieslist[i].name.toLowerCase().includes(toSearch.toLowerCase())){
          this.allActivities.push(this.Activitieslist[i]) ;
        }
      }
    }
    return this.allActivities;
  }

  changeSearchBtn(searchItemHTML: string) {
    if (searchItemHTML == 'Recherche par Ville') {
      this.researcheBy = this.searchArray[1];
      this.isCityActivated = false;
    } else {
      this.researcheBy = this.searchArray[0];
      this.isCityActivated = true;
    }
  }
  SearchVilleEnter(){
    this.goToDetailVille(this.touteVille[0])
  }
  SearchActivityEnter(){
    this.goToDetailActivity(this.allActivities[0])
  }


}
