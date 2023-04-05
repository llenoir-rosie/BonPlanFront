import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Activite } from '../activite';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { __values } from 'tslib';
import { cityactivities } from '../cityactivity';

@Component({
  selector: 'liste-activite',
  templateUrl: './liste-activite.component.html',
  styleUrls: ['liste-activite.component.css'],
})

export class ListeActiviteComponent implements OnInit {

  public listeActivites: Activite[];
  public listeAllActivites : Activite[];
  public nomdelaville: String;
  dialogRefs: MatDialog;
  newCityActivity : cityactivities;
  id: number;
  


  constructor(private dialog : MatDialog, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {


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
  }
  
  //@return redirection to /ville
  goToVilleActiviteBonplan(ville: String , activity: Activite) {
      this.router.navigate(['/ville', ville, activity.name])
  }


@ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
  this.dialog.open(templateRef);
}

  public ValidationDelete(){
    console.log('click')
  }

  public AddNewAct(){

    const checked_boxs = (document.querySelectorAll('[name ="activitybox"]:checked'));
    const lenght_checked_boxs = checked_boxs.length;

    id : Number;
    
    for (var index: number=0; index<lenght_checked_boxs; index++){
      const html_checked_boxs = (<HTMLInputElement>checked_boxs.item(index)).value;
      const id = 0;
      this.newCityActivity = new cityactivities(this.id, this.nomdelaville, html_checked_boxs)
      this.http.post('http://localhost:8080/cityactivities/new',this.newCityActivity).subscribe((data)=>
      this.getAllActivities(this.nomdelaville));
    }
  }

}

function Inject(target: typeof ListeActiviteComponent, propertyKey: undefined, parameterIndex: 0): void {
  throw new Error('Function not implemented.');
}

