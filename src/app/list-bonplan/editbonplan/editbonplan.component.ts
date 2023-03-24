import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bonplan } from 'src/app/bonplan';
import { BONPLAN } from 'src/app/mock-bonplan-list';

@Component({
  selector: 'app-editbonplan',
  template: `
    <h2>editer le bon plan</h2>
    <app-bonplan-form ></app-bonplan-form>
  `,
  styles: [
  ]
})
export class EditbonplanComponent implements OnInit{
  bonplan: Bonplan[]=BONPLAN;

  constructor(
    private route: ActivatedRoute
  ){}

ngOnInit() {
}
}
