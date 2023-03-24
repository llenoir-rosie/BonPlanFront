import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';
import { Ville } from './ville';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['base-page.css'],
})

export class AppComponent implements OnInit {
  searchTerms = new Subject<string>();
  touteVille: Ville[] = [];
  Villeslist: Ville[] = [];


  constructor(private router: Router, private http: HttpClient) { }

  goToVilleActivite(ville: Ville) {
    this.router.navigate(['/ville', ville.name]);
  }

  goToRegistration(){
    this.router.navigate(['/registration']);
  }

  ngOnInit(): void {
    // this.ville$ = this.searchTerms.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term) => this.SearchVille(term))
    // );
    this.http.get<Ville[]>('http://localhost:8080/cities').subscribe((data) => {
      this.Villeslist = data;
    })  
    console.log(this.Villeslist)
  }

  // search(term: string) {
  //   this.SearchVille(term);
  //   // this.searchTerms.next(term);
  // }

  goToDetail(ville: Ville) {
    this.router.navigate(['/ville', ville.name])
  }


  SearchVille(toSearch: string){
    this.touteVille =[]
    if(toSearch.length <= 1){
      return of([]);
    }else{
      for (const i in this.Villeslist){
        if (this.Villeslist[i].name.includes(toSearch)){
          this.touteVille.push(this.Villeslist[i]) ;
        }
      }
    }
    return this.touteVille;
  }

}

