import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';
import { Ville } from './ville';
import { User } from './User';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent implements OnInit {
  touteVille: Ville[] = [];
  Villeslist: Ville[] = [];
  logIn: Boolean = false;
  commonUser = new User("","","","", "", "COMMON")
  currentUser: User;
  constructor(private router: Router, private http: HttpClient) { }

  goToVilleActivite(ville: Ville) {
    this.router.navigate(['/ville', ville.name]);
  }

  login() {
    this.router.navigate(['/login'])
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
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")!);
    localStorage.setItem("currentUser", JSON.stringify(this.commonUser));
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
        if (this.Villeslist[i].name.toLowerCase().includes(toSearch.toLowerCase())){
          this.touteVille.push(this.Villeslist[i]) ;
        }
      }
    }
    return this.touteVille;
  }

}

