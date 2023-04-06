import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Activite } from '../activite';
import { Ville } from '../ville';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { __values } from 'tslib';

@Component({
  selector: 'liste-activite',
  templateUrl: './liste-activite.component.html',
  styleUrls: ['liste-activite.component.css'],
})

export class ListeActiviteComponent implements OnInit {
  currentImg: String;
  currentVille: String;
  public listeActivites: Activite[];
  public listeAllActivites : Activite[];
  public nomdelaville: String;
  constructor(private dialog : MatDialog, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    // on attribue la bonne valeur à currentImg en allant la chercher dans localStorage
    this.currentImg = localStorage.getItem("currentImg")!;

    // on attribue la bonne valeur à currentVille en allant la chercher dans localStorage
    this.currentVille = localStorage.getItem("currentVille")!;

  dialogRefs: MatDialog;

    const routeParams = this.route.snapshot.params;
    this.route.params.subscribe(routeParams => { //this.route.params est le nom de la ville et on attribut cette valeur à routeParams
    this.nomdelaville = routeParams['name']; // ne pas supprimer : la variable nomdelaville est utilisé plus bas
    this.getAllActivities(routeParams['name']);
    this.getAllPossibleActivities();

    });
  }
    // this.nomdelaville = (villeName+'').charAt(0).toUpperCase()+villeName?.substr(1)
    // si jamais il y a des soucis avec les majuscules des premières lettres des villes

  public getAllActivities(nomville: String) {
    this.http.get<Activite[]>("http://localhost:8080/" + nomville + "/activites").subscribe((data) => {
    this.listeActivites = data;
    })
  }

  public getAllPossibleActivities(){
    this.http.get<Activite[]>("http://localhost:8080/activites").subscribe((data) => {
      this.listeAllActivites = data;
    })
  }

  goToVilleList() {
    this.router.navigate(['/ville']);

    // on change la valeur de currentImg
    localStorage.setItem('currentImg', "./assets/img/activite-navbar.jpeg");
    this.currentImg = localStorage.getItem("currentImg")!;

    // on change la valeur de currentVille
    localStorage.setItem('currentVille'," de " + "");
    this.currentVille = localStorage.getItem("currentVille")!;
  }
  
  //@return redirection to /ville
  goToVilleActiviteBonplan(ville: String , activity: Activite) {
      this.router.navigate(['/ville', ville, activity.name])
  }

@ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
  this.dialog.open(templateRef);
}
// public openDialogWithoutRef() {
//   this.dialog.open(this.secondDialog);
// }
// 


  public ValidationDelete(){
    console.log('click')
  }

  // checked : Boolean;
  public AddNewAct(){

 
    const checked_boxs = (document.querySelectorAll('[name ="activitybox"]:checked'));
    
 
    console.log(checked_boxs);
    

 
  }

}

function Inject(target: typeof ListeActiviteComponent, propertyKey: undefined, parameterIndex: 0): void {
  throw new Error('Function not implemented.');
}

