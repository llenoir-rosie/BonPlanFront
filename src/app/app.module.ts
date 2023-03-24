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
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { Registration } from './registration/registration.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
