import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Activite } from '../activite';
import { Ville } from '../ville';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { __values } from 'tslib';
import { cityactivities } from '../cityactivity';

@Component({
  selector: 'liste-activite',
  templateUrl: './liste-activite.component.html',
  styleUrls: ['liste-activite.component.css'],
})

export class ListeActiviteComponent implements OnInit {
  currentImg: String;
  currentVille: String;
  currentActivite: String;
  public listeActivites: Activite[];
  public listeAllActivites : Activite[];
  public nomdelaville: String;
  dialogRefs: MatDialog;
  newCityActivity : cityactivities;
  newActivity : Activite;
  id: number;
  count_bonplan : Number;
  count_mauvaisplan : Number;
  


  constructor(private dialog : MatDialog, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    // on attribue la bonne valeur à currentImg en allant la chercher dans localStorage
    this.currentImg = localStorage.getItem("currentImg")!;

    // on attribue la bonne valeur à currentActivite en allant la chercher dans localStorage
    localStorage.setItem('currentActivite', "");
    this.currentActivite = localStorage.getItem('currentActivite')!;

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
    this.http.get<Activite[]>("http://localhost:8080/activities").subscribe((data) => {
      this.listeAllActivites = data;
    })
  }

  goToVilleList() {
    this.router.navigate(['/ville']);

    // on change la valeur de currentImg
    localStorage.setItem('currentImg', "./assets/img/activite-navbar.jpeg");
    this.currentImg = localStorage.getItem("currentImg")!;

    // on change la valeur de currentVille
    localStorage.setItem('currentVille', "");
    this.currentVille = localStorage.getItem("currentVille")!;
  }
  
  //@return redirection to /ville
  goToVilleActiviteBonplan(ville: String , activity: Activite) {
    this.router.navigate(['/ville', this.nomdelaville, activity.name])

    localStorage.setItem("currentImg", activity.image.toString());
    this.currentImg = localStorage.getItem("currentImg")!;

    localStorage.setItem("currentActivite", "\xa0"  + activity.name.toString());
    this.currentActivite = localStorage.getItem("currentActivite")!;

    localStorage.setItem("currentVille"," à " + this.nomdelaville.toString());
    this.currentVille = localStorage.getItem("currentVille")!;
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
    this.newCityActivity = new cityactivities(this.id, this.nomdelaville, new_activity_name)

    this.http.post('http://localhost:8080/activity/new', this.newActivity).subscribe(()=>
    {this.http.post('http://localhost:8080/cityactivities/new',this.newCityActivity).subscribe((data)=>
    this.getAllActivities(this.nomdelaville));
  });
  }
  
  public CountBonPlan(activity_name : String){
    this.http.get<Number>('http://localhost:8080/'+this.nomdelaville+'/'+activity_name+'/countbonplan').subscribe((data)=>
    this.count_bonplan = data);
  }

  public CountMauvaisPlan(activity_name:String){
    this.http.get<Number>('http://localhost:8080/'+this.nomdelaville+'/'+activity_name+'/countmauvaisplan').subscribe((data)=>
    this.count_mauvaisplan = data)
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

  public UpdateActivity(activity : Activite){
    const UpdateDescription : String= (<HTMLInputElement>document.getElementById("update_description")).value;
    let UpdateImagePath : String = (<HTMLInputElement>document.getElementById("update_image")).value;
    if (UpdateImagePath.length==0){
      UpdateImagePath = activity.image;
    }

    this.newActivity = new Activite(UpdateImagePath, activity.name, UpdateDescription)
    console.log(this.newActivity)

    this.http.put('http://localhost:8080/activity/update',this.newActivity).subscribe((data)=>
    this.getAllActivities(this.nomdelaville))
  }

}

function Inject(target: typeof ListeActiviteComponent, propertyKey: undefined, parameterIndex: 0): void {
  throw new Error('Function not implemented.');
}

