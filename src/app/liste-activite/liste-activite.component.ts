import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activite } from '../activite';


@Component({
  selector: 'app-liste-activite',
  templateUrl: './liste-activite.component.html',
})
export class ListeActiviteComponent implements OnInit {

  public listeActivites: Activite[];
  public nomdelaville: String;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    const villeName: string|null = this.route.snapshot.paramMap.get('ville.name');
    this.nomdelaville = (villeName+'').charAt(0).toUpperCase()+villeName?.substr(1)
    this.getAllActivities(this.nomdelaville); 
  }

  public getAllActivities(nomville: String) {
    this.http.get<Activite[]>("http://localhost:8080/" + nomville + "/activites").subscribe((data) => {
    this.listeActivites = data;
    console.log(this.listeActivites)
  })
  }
  goToVilleList() {
    this.router.navigate(['/ville']);
  }
   
  // goToVilleActiviteBonplan(ville: Ville) {
  //     this.router.navigate(['/ville/', ville.name,'bonplan'])

  //   }

}
