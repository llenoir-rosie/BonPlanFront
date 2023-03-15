import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppComponentActivite } from './app.activite.component';
import { BorderVilleDirective } from './ville/border-ville.directive';

@NgModule({
  declarations: [
    AppComponent,
    BorderVilleDirective,
    AppComponentActivite
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
