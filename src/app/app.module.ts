import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { VilleTypeColorPipe } from './ville-type-color.pipe';
import { ListeVilleComponent } from './liste-ville/liste-ville.component';
import { ListeActiviteComponent } from './liste-activite/liste-activite.component';
import { BorderCardDirective } from './border-card.directive';
import { ListBonplanComponent } from './list-bonplan/list-bonplan.component';
import { ListPrecisionComponent } from './list-precision/list-precision.component';
<<<<<<< HEAD
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
=======
import { BonplanFormComponent } from './list-bonplan/bonplan-form/bonplan-form.component';
import { FormsModule } from '@angular/forms';
import { EditbonplanComponent } from './list-bonplan/editbonplan/editbonplan.component';

>>>>>>> frontfthibault

@NgModule({
  declarations: [
    AppComponent,
    // VilleTypeColorPipe,
    ListeVilleComponent,
    ListeActiviteComponent,
    BorderCardDirective,
    ListBonplanComponent,
    ListPrecisionComponent,
    BonplanFormComponent,
    EditbonplanComponent,
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
    AppRoutingModule,
    HttpClientModule
=======
    FormsModule,
    AppRoutingModule
>>>>>>> frontfthibault
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
