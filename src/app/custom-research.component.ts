// import { HttpClient } from '@angular/common/http';
// import { Component, Input, OnInit } from '@angular/core';
// import { Ville } from './ville';
// import { of } from 'rxjs';
// import { Router } from '@angular/router';
// import { Activite } from './activite';

// @Component({
//     selector: 'my-custom-component',
//     templateUrl: './custom-research.component.html',
//     // styleUrls: ['./custom-research.component.css']
// })

// export class customResearchComponent implements OnInit{
//     @Input('customResearch') customResearch: String;

//     allElement: any[];
//     findElement: any[];
//     currentImg: string;
//     currentVille: string;
//     currentActivite: string;
//     public searchInput: String = '';

//     constructor(private router: Router, private http: HttpClient) {}

//     ngOnInit(): void {
//         this.allElement = [];
//         this.findElement = [];
//         if (this.customResearch == "Recherche par Ville") {
//             this.http.get<Ville[]>('http://localhost:8080/cities').subscribe((data) => {
//                 this.allElement = data 
//               }) 
//         } else {
//             this.http.get<Activite[]>('http://localhost:8080/activities').subscribe((data) => {
//                 this.allElement = data;
//               }) 
//         }
//     }

//     SearchElement(toSearch: string){
//         this.findElement = []
//         if(toSearch.length <= 1){
//           return of([]);
//         }
//         else{
//           for (const i in this.allElement){
//             if (this.allElement[i].name.toLowerCase().includes(toSearch.toLowerCase())){
//               this.findElement.push(this.allElement[i]) ;
//             }
//           }
//         }
//         return this.findElement;
//       }

//     SearchEnter(){
//     this.goToDetail(this.findElement[0])
//     }

//     goToDetail(element: any) {
//         console.log(typeof(element))
//         // this.router.navigate(['/ville', element.name]);
    
//         // // change la valeur de la currentImg de localStorage par l'image de la ville où on est
//         // localStorage.setItem("currentImg", element.image.toString());
//         // this.currentImg = localStorage.getItem("currentImg")!;
        
//         // if (this.customResearch == 'Recherche par Activité')
//         // // change la valeur de la currentVille de localStorage par le nom de la ville où on est
//         // localStorage.setItem('currentVille', "\xa0" + "à " + element.name);
//         // this.currentVille = localStorage.getItem("currentVille")!;
    
//         // // change la valeur de la currentActivite de localStorage par le nom de la ville où on est
//         // localStorage.setItem('currentActivite', "");
//         // this.currentActivite = localStorage.getItem("")!;
//       }
// }