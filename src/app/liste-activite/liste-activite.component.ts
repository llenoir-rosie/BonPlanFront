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
  newActivity : Activite;
  id: number;
  count_bonplan : Number;
  


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

  public CreateAct(){
    new_activity_name : String;
    new_activity_description : String;
    new_activity_image : String;
    id : Number;
    const id=0;

    const new_activity_name = (<HTMLInputElement>document.getElementById("new_activity_name")).value;
    const new_activity_description = (<HTMLInputElement>document.getElementById("new_activity_description")).value;
    const new_activity_image = "";

    this.newActivity = new Activite(new_activity_image, new_activity_name, new_activity_description);
    console.log(this.newActivity)
    this.newCityActivity = new cityactivities(this.id, this.nomdelaville, new_activity_name)

    this.http.post('http://localhost:8080/activite/new', this.newActivity).subscribe(()=>
    {this.http.post('http://localhost:8080/cityactivities/new',this.newCityActivity).subscribe((data)=>
    this.getAllActivities(this.nomdelaville));
  });
  }
  
  public CountBonPlan(activity_name : String){
    this.http.get<Number>('http://localhost:8080/'+this.nomdelaville+'/'+activity_name+'/countbonplan').subscribe((data)=>
    this.count_bonplan = data);
  }

  public DeleteCityActivity(){

    
    const id : number=0;
    const activity_name: String = (<HTMLInputElement>document.getElementById("delete_activity")).value;
    
    this.http.get<number>('http://localhost:8080/'+this.nomdelaville+'/'+activity_name+'/countbonplan').subscribe((data)=>
    this.count_bonplan = data);

    console.log('count bon plan : ',this.count_bonplan);
    this.http.delete('http://localhost:8080/cityactivities/delete/'+this.nomdelaville+'/'+activity_name).subscribe(()=>
    this.getAllActivities(this.nomdelaville));
  }

}

function Inject(target: typeof ListeActiviteComponent, propertyKey: undefined, parameterIndex: 0): void {
  throw new Error('Function not implemented.');
}

