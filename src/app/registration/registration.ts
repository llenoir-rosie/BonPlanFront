import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Ville } from '../ville';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'registration',
  templateUrl: 'registration.html'
})

export class Registration implements OnInit{
  ngOnInit(): void {
      this.jesuisla();
  }

  jesuisla() {
    console.log("ici")
  }



}