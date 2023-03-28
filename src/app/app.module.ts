import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { VilleTypeColorPipe } from './ville-type-color.pipe';
import { ListeVilleComponent } from './liste-ville/liste-ville.component';
import { ListeActiviteComponent } from './liste-activite/liste-activite.component';
import { BorderCardDirective } from './border-card.directive';
import { PopUpComponentAddBonPlan } from './list-bonplan/pop-up-addBonPlan'
import { ListBonplanComponent } from './list-bonplan/list-bonplan.component';
import { ListPrecisionComponent } from './list-precision/list-precision.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import { Registration } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    // VilleTypeColorPipe,
    ListeVilleComponent,
    ListeActiviteComponent,
    BorderCardDirective,
    ListBonplanComponent,
    ListPrecisionComponent,
    Registration,
    PopUpComponentAddBonPlan,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
