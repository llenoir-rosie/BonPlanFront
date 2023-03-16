import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BorderVilleDirective } from './border-ville.directive';
import { VilleTypeColorPipe } from './ville-type-color.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BorderVilleDirective,
    VilleTypeColorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
