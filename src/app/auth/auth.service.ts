import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";


@Injectable({
  providedIn : 'root'
})
export class AuthService {
  username$ = 'testastos';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  setUserName() {
    const routeParams = this.route.snapshot.params;
    this.route.params.subscribe(routeParams => {
      this.username$ = routeParams['currentUser']
    })
}
}