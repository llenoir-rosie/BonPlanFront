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
      // Pour installer file-saver (fonction saveAs)
      // npm install file-saver -save
      // npm install @types/file-saver -save-dev
import * as FileSaver from "file-saver";

// Pour installer file-saver (fonction saveAs) :
// npm install file-saver -save
// npm install @types/file-saver -save-dev


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
  allowModeratorRight: boolean;
  allowUserRight: boolean;

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

    if (localStorage.getItem("currentUser") == null) {
      this.allowModeratorRight = false
      this.allowUserRight = false
    } else {
      if (localStorage.getItem("currentUserRole")! == 'MODERATOR') {
        this.allowModeratorRight = true
      } else {
        this.allowUserRight = true
      }
    }

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
    this.listeAllActivites.sort((a : Activite , b : Activite) => (a.name < b.name) ? -1 : 1)
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
    for (var index: number=0; index<lenght_checked_boxs; index++){
      const html_checked_boxs = (<HTMLInputElement>checked_boxs.item(index)).value;
      this.newCityActivity = new cityactivities(0, this.nomdelaville, html_checked_boxs)
      this.http.post('http://localhost:8080/cityactivities/new',this.newCityActivity).subscribe((data)=>
      this.getAllActivities(this.nomdelaville));
    }
  }

  public CreateAct(){
    const new_activity_name = (<HTMLInputElement>document.getElementById("new_activity_name")).value;
    const new_activity_description = (<HTMLInputElement>document.getElementById("new_activity_description")).value;
    let new_activity_image = <HTMLInputElement>document.getElementById("new_activity_image");
    
    let PathNewImg : string = ""

    if (new_activity_image.files?.length != 0){
      const file1 : File = new_activity_image.files![0] ;
      PathNewImg = file1.name
      FileSaver.saveAs(file1 , PathNewImg) 
    }
    
    this.newActivity = new Activite(PathNewImg, new_activity_name, new_activity_description);
    this.newCityActivity = new cityactivities(0, this.nomdelaville, new_activity_name)
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
    this.http.delete('http://localhost:8080/cityactivities/delete/'+this.nomdelaville+'/'+activity_name).subscribe(()=>
    this.getAllActivities(this.nomdelaville));
  }

  public UpdateActivity(activity : Activite){
    const UpdateDescription : String= (<HTMLInputElement>document.getElementById("update_description")).value;
    let UpdateImage = <HTMLInputElement>document.getElementById("update_image");
    let PathUpdateImg : string = ""

    if (UpdateImage.files?.length != 0){
      const file1 : File = UpdateImage.files![0] ;
      PathUpdateImg = file1.name
      FileSaver.saveAs(file1 , PathUpdateImg) 
    
    }

    this.newActivity = new Activite(PathUpdateImg, activity.name, UpdateDescription)
    this.http.put('http://localhost:8080/activity/update',this.newActivity).subscribe((data)=>
    this.getAllActivities(this.nomdelaville))
  }

  public CheckNullActName(){
    const new_activity_name = (<HTMLInputElement>document.getElementById('new_activity_name')).value;
    if (new_activity_name.length>0){
        (<HTMLInputElement>document.getElementById('CreateActValider')).disabled=false;
    }else{
      (<HTMLInputElement>document.getElementById('CreateActValider')).disabled=true;
    }
  }


}

function Inject(target: typeof ListeActiviteComponent, propertyKey: undefined, parameterIndex: 0): void {
  throw new Error('Function not implemented.');
}

