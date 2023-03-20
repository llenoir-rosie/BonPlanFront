import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { VILLE } from './mock-ville-list';
import { Ville } from './ville';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})

export class AppComponent implements OnInit {
  searchTerms = new Subject<string>();
  Villeslist: Ville[] = VILLE;

  constructor(private router: Router) { }

  goToVilleActivite(ville: Ville) {
    this.router.navigate(['/ville', ville.name])
  }

  ngOnInit(): void {
    // this.Villes$ = this.searchTerms.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term) => this.searchVilleList(term))
    // );
    console.log(this.Villeslist)

  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetail(Ville: Ville) {
    const link = ['/Ville', Ville.name];
    this.router.navigate(link);
  }

}

