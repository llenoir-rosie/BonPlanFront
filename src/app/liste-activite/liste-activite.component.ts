import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activite } from '../activite';


@Component({
  selector: 'app-liste-activite',
  templateUrl: './liste-activite.component.html',
})
export class ListeActiviteComponent implements OnInit {

  public listeActictivies: Activite[] = [];
  // ville: Ville|undefined;
  

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    // this.villeList = VILLE;
    const villeName: string|null = this.route.snapshot.paramMap.get('ville.name');
    let nomdelaville = (villeName+'').charAt(0).toUpperCase()+villeName?.substr(1)

    this.getAllActivities(nomdelaville); 
    // this.ville = this.villeList.find(ville => ville.name == nomdelaville)

  }

  public getAllActivities(nomville) {
    this.http.get<Activite[]>('http://localhost:8080/{{nomville}}/activités').subscribe((data) => {
    this.listeActictivies = data;
  })
  }
  goToVilleList() {
    this.router.navigate(['/ville']);
  }
   
  // goToVilleActiviteBonplan(ville: Ville) {
  //     this.router.navigate(['/ville/', ville.name,'bonplan'])

  //   }

}
