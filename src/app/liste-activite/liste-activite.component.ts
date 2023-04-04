import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activite } from '../activite';

@Component({
  selector: 'app-liste-activite',
  templateUrl: './liste-activite.component.html',
  styleUrls: ['liste-activite.component.css'],
})
export class ListeActiviteComponent implements OnInit {

  public listeActivites: Activite[];
  public nomdelaville: String;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {

    const routeParams = this.route.snapshot.params;

    this.route.params.subscribe(routeParams => { //this.route.params est le nom de la ville et on attribut cette valeur à routeParams
    this.nomdelaville = routeParams['name']; // ne pas supprimer : la variable nomdelaville est utilisé plus bas
    this.getAllActivities(routeParams['name']);
    });
    
    // this.nomdelaville = (villeName+'').charAt(0).toUpperCase()+villeName?.substr(1)
    // si jamais il y a des soucis avec les majuscules des premières lettres des villes
  }

  public getAllActivities(nomville: String) {
    this.http.get<Activite[]>("http://localhost:8080/" + nomville + "/activites").subscribe((data) => {
    this.listeActivites = data;
    })
  }

  goToVilleList() {
    this.router.navigate(['/ville']);
  }
  
  //@return redirection to /ville
  goToVilleActiviteBonplan(ville: String , activity: Activite) {
      this.router.navigate(['/ville', ville, activity.name])
  }
}
