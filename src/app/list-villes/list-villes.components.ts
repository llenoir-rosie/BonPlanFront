import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Activite } from '../activite';
import { MatDialog } from '@angular/material/dialog';
import { __values } from 'tslib';
import { Ville } from '../ville';
import { cityactivities } from '../cityactivity';
import * as FileSaver from 'file-saver';

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
  newCityActivity: cityactivities;
  count_bonplan: Number;
  count_mauvaisplan: Number;


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
    this.listAllCities.sort((a : Ville , b : Ville) =>
      (a.name < b.name) ? -1 : 1)
    
    console.log(this.listAllCities)
    })
  }

  public editCity(city_image: String) {

    const new_city_name = (<HTMLInputElement>document.getElementById("new_city_name")).value;
    const new_city_description = (<HTMLInputElement>document.getElementById("new_city_description")).value;
    let new_city_image = <HTMLInputElement>document.getElementById("new_city_image");
    let PathNewImg = "";
    
    if (new_city_image.files?.length != 0){
      const file1 : File = new_city_image.files![0] ;
      PathNewImg = file1.name;
      FileSaver.saveAs(file1 , PathNewImg) ;
    }

    this.newCity = new Ville( new_city_name, new_city_description, PathNewImg);
    this.http.put('http://localhost:8080/city/update', this.newCity).subscribe(() => {
      this.getAllCities(this.route.snapshot.params['activity.name'])
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

  AddCity(){
    const checked_boxs = (document.querySelectorAll('[name = "citybox"]:checked'));
    const length_checkedboxs = checked_boxs.length;
    for (var index: number=0; index< length_checkedboxs; index++){
      const html_checked_boxs = (<HTMLInputElement>checked_boxs.item(index)).value;
      this.newCityActivity = new cityactivities(0, html_checked_boxs, this.nameActivity);
      this.http.post('http://localhost:8080/cityactivities/new', this.newCityActivity).subscribe((data) =>
      this.getAllCities(this.nameActivity));
    }
  }

  CreateCity(){
    const new_city_name = (<HTMLInputElement>document.getElementById('new_city_name')).value;
    const new_city_description = (<HTMLInputElement>document.getElementById('new_city_description')).value;
    let new_city_image = (<HTMLInputElement>document.getElementById('new_city_image'));
    let PathNewImg : string ="";

    if (new_city_image.files?.length != 0){
      const file1 : File = new_city_image.files![0] ;
      PathNewImg = file1.name
      FileSaver.saveAs(file1 , PathNewImg)
    }
    
    this.newCity = new Ville(new_city_name, new_city_description, PathNewImg)
    this.newCityActivity = new cityactivities(0, new_city_name, this.nameActivity)

    this.http.post('http://localhost:8080/city/new', this.newCity).subscribe(()=>
    {this.http.post('http://localhost:8080/cityactivities/new',this.newCityActivity).subscribe((data)=>
    this.getAllCities(this.nameActivity))})
  }

  public CheckNullCityName(){
    const new_city_name = (<HTMLInputElement>document.getElementById('new_city_name')).value;
    if (new_city_name.length>0){
        (<HTMLInputElement>document.getElementById('CreateActValider')).disabled=false;
    }else{
      (<HTMLInputElement>document.getElementById('CreateActValider')).disabled=true;
    }
  }

  public CountBonPlan(city_name : String){
    this.http.get<Number>('http://localhost:8080/'+city_name+'/'+this.nameActivity+'/countbonplan').subscribe((data)=>
    this.count_bonplan = data);
  }

  public CountMauvaisPlan(city_name:String){
    this.http.get<Number>('http://localhost:8080/'+city_name+'/'+this.nameActivity+'/countmauvaisplan').subscribe((data)=>
    this.count_mauvaisplan = data)
  }

  public DeleteCityActivity(){
    const city_name : String = (<HTMLInputElement>document.getElementById("delete_city")).value;
    this.http.delete('http://localhost:8080/cityactivities/delete/'+city_name+'/'+this.nameActivity).subscribe((data)=>
    this.getAllCities(this.nameActivity))
  }



}

function Inject(target: typeof ListeVillesComponent, propertyKey: undefined, parameterIndex: 0): void {
  throw new Error('Function not implemented.');
}

