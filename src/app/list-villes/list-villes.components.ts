import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Activite } from '../activite';
import { MatDialog } from '@angular/material/dialog';
import { __values } from 'tslib';
import { Ville } from '../ville';
import { cityactivities } from '../cityactivity';

@Component({
  selector: 'liste-villes',
  templateUrl: 'list-villes.components.html',
  styleUrls: ['list-villes.components.css'],
})

export class ListeVillesComponent implements OnInit {

//   public listeVilles: Activite[];
  public listeCities : Ville[];
  public nameActivity: String;
  public Act: Activite;
  public listAllCities: Ville[];
  public newCity: Ville;
  dialogRefs: MatDialog;
  id: number;
  currentImg: String;
  currentVille: String;
  currentActivite: String;  


  constructor(private dialog : MatDialog, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {

    // on attribue la bonne valeur à currentImg en allant la chercher dans localStorage
    this.currentImg = localStorage.getItem("currentImg")!;

    // on attribue la bonne valeur à currentVille en allant la chercher dans localStorage
    this.currentVille = localStorage.getItem("currentVille")!;
    this.currentActivite = localStorage.getItem("currentActivite")!;

    const routeParams = this.route.snapshot.params;
    this.route.params.subscribe(routeParams => { //this.route.params est le nom de la ville et on attribut cette valeur à routeParams
        this.nameActivity = routeParams['activity.name']; // ne pas supprimer : la variable nomdelaville est utilisé plus bas
        this.getAllCities(routeParams['activity.name']);
        this.getAllPossibleCities();
    });
  }
    // this.nomdelaville = (villeName+'').charAt(0).toUpperCase()+villeName?.substr(1)
    // si jamais il y a des soucis avec les majuscules des premières lettres des villes

  public getAllCities(nameActivity: String) {
    this.http.get<Ville[]>("http://localhost:8080/villes/" + nameActivity).subscribe((data) => {
    this.listeCities = data;
    })
  }

  public getAllPossibleCities(){
    this.http.get<Ville[]>("http://localhost:8080/cities").subscribe((data) => {
      this.listAllCities = data;
    })
  }

  public editCity() {

    const new_city_name = (<HTMLInputElement>document.getElementById("new_city_name")).value;
    const new_city_description = (<HTMLInputElement>document.getElementById("new_city_description")).value;
    const new_city_image = "";

    this.newCity = new Ville( new_city_name, new_city_description, new_city_image);

    this.http.put('http://localhost:8080/city/update', this.newCity).subscribe(() => {
      console.log(this.newCity)
      this.http.get<Ville[]>("http://localhost:8080/cities").subscribe((data) => {
        this.listAllCities = data;
      })
    })
  }

  goToVilleList() {
    this.router.navigate(['/ville']);

    // on change la valeur de currentImg
    localStorage.setItem('currentImg', "./assets/img/activite-navbar.jpeg");
    this.currentImg = localStorage.getItem("currentImg")!;

    // on change la valeur de currentVille
    localStorage.setItem('currentActivite', "");
    this.currentActivite = localStorage.getItem("currentActivite")!;
  }
  
  goToVilleActiviteBonplan(ville: Ville , Act: Activite) {
    this.router.navigate(['/ville', ville.name, this.nameActivity])

    localStorage.setItem("currentActivite", "\xa0"  + this.nameActivity.toString());
    this.currentActivite = localStorage.getItem("currentActivite")!;

    localStorage.setItem("currentVille"," à " + ville.name);
    this.currentVille = localStorage.getItem("currentVille")!;
  }

  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

}

function Inject(target: typeof ListeVillesComponent, propertyKey: undefined, parameterIndex: 0): void {
  throw new Error('Function not implemented.');
}

