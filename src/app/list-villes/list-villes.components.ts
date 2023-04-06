import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Activite } from '../activite';
import { MatDialog } from '@angular/material/dialog';
import { __values } from 'tslib';
import { Ville } from '../ville';

@Component({
  selector: 'liste-villes',
  templateUrl: 'list-villes.components.html',
  styleUrls: ['list-villes.components.css'],
})

export class ListeVillesComponent implements OnInit {

//   public listeVilles: Activite[];
  public listeCities : Ville[];
  public nameActivity: String;
  public listAllCities: Ville[];
  dialogRefs: MatDialog;
  


  constructor(private dialog : MatDialog, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {

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
    console.log(nameActivity)
    this.http.get<Ville[]>("http://localhost:8080/villes/" + nameActivity).subscribe((data) => {
    this.listeCities = data;
    })
  }

  public getAllPossibleCities(){
    this.http.get<Ville[]>("http://localhost:8080/cities").subscribe((data) => {
      this.listAllCities = data;
    })
  }

  goToVilleList() {
    this.router.navigate(['/ville']);
  }
  
goToVilleActiviteBonplan(ville: Ville , nameAct: String) {
  this.router.navigate(['/ville', ville.name , nameAct])
}

//   public goToFormaddAct(){
//     this.dialogRefs.open(PopUpAddActivite,{
//       width : '600px',
//       height : '600px',
//       data: {
//         nameCity : this.nomdelaville,
//         listActivities : this.listeActivites,
//       }}).afterClosed().subscribe(() => this.getAllActivities(this.nomdelaville));
//     }


@ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
  this.dialog.open(templateRef);
}
public openDialogWithoutRef() {
  this.dialog.open(this.secondDialog);
}



  public ValidationDelete(){
    console.log('click')
  }

  checked : Boolean;
  public AddNewAct(){
    const checked_boxs = (document.querySelectorAll('[name ="activitybox"]:checked'));
  }

}

function Inject(target: typeof ListeVillesComponent, propertyKey: undefined, parameterIndex: 0): void {
  throw new Error('Function not implemented.');
}

