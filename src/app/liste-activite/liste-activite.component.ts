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
import * as FileSaver from "file-saver";

@Component({
  selector: 'liste-activite',
  templateUrl: './liste-activite.component.html',
  styleUrls: ['liste-activite.component.css'],
})

export class ListeActiviteComponent implements OnInit {
  currentImg: String;
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
 this.currentImg = localStorage.getItem("currentImg")!;
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
    this.http.get<Activite[]>("http://localhost:8080/activity").subscribe((data) => {
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
    const id=0;
    const new_activity_name = (<HTMLInputElement>document.getElementById("new_activity_name")).value;
    const new_activity_description = (<HTMLInputElement>document.getElementById("new_activity_description")).value;
    const new_activity_image = (<HTMLInputElement>document.getElementById("new_activity_image")).files;
    console.log(new_activity_image)

    const new_activity_image2=""
    this.newActivity = new Activite(new_activity_image2, new_activity_name, new_activity_description);
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
    this.http.delete('http://localhost:8080/cityactivities/delete/'+this.nomdelaville+'/'+activity_name).subscribe(()=>
    this.getAllActivities(this.nomdelaville));
  }

  public UpdateActivity(activity : Activite){
    const UpdateDescription : String= (<HTMLInputElement>document.getElementById("update_description")).value;
       // let UpdateImagePath : String = (<HTMLInputElement>document.getElementById("update_image")).value;
    let UpdateImage = <HTMLInputElement>document.getElementById("update_image");
    if (UpdateImage != null){
      const file1 : File = UpdateImage.files![0] ;
      console.log(file1)
      console.log(UpdateImage.files![0])
      let PathUpdateImg : string = file1.name
      FileSaver.saveAs(file1 , PathUpdateImg) 
      console.log(file1)
      const newDir : string = "../../" + file1.name
      // Pour installer file-saver (fonction saveAs)
      // npm install file-saver -save
      // npm install @types/file-saver -save-dev
    }
   
    // if (UpdateImagePath.length==0){
    //   UpdateImagePath = activity.image;}

    const UpdateImagePath2 = ""
    this.newActivity = new Activite(UpdateImagePath2, activity.name, UpdateDescription)
    this.http.put('http://localhost:8080/activity/update',this.newActivity).subscribe((data)=>
    this.getAllActivities(this.nomdelaville))
  }


}

function Inject(target: typeof ListeActiviteComponent, propertyKey: undefined, parameterIndex: 0): void {
  throw new Error('Function not implemented.');
}

