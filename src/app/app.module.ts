import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeVilleComponent } from './liste-ville/liste-ville.component';
import { ListeActiviteComponent } from './liste-activite/liste-activite.component';

@NgModule({
  declarations: [
    AppComponent,
    ListeVilleComponent,
    ListeActiviteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
