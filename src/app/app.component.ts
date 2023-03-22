import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';
import { VILLE } from './mock-ville-list';
import { Ville } from './ville';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['base-page.css'],
})

export class AppComponent implements OnInit {
  searchTerms = new Subject<string>();
  touteVille: Ville[] = [];
  Villeslist: Ville[] = VILLE;


  constructor(private router: Router) { }

  goToVilleActivite(ville: Ville) {
    this.router.navigate(['/ville', ville.name]);
  }

  ngOnInit(): void {
    // this.ville$ = this.searchTerms.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term) => this.SearchVille(term))
    // );
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

