import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeVilleComponent } from './liste-ville/liste-ville.component';
import { ListeActiviteComponent } from './liste-activite/liste-activite.component';
import { PopUpComponentAddBonPlan } from './list-bonplan/pop-up-addBonPlan';
import { PopUpComponentAddMauvaisPlan } from './list-bonplan/pop-up-addMauvaisPlan';
import { PopUpComponentUpdateBonPlan } from './list-bonplan/pop-up-updateBonPlan.component'
import { ListBonplanComponent } from './list-bonplan/list-bonplan.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { Registration } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
//npm i ngx-page-scroll-core
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { ListeVillesComponent } from './list-villes/list-villes.components';
import { PopUpComponentUpdateMauvaisPlan } from './list-bonplan/pop-up-updateMauvaisPlan.component';
import { AuthInterceptor } from './AuthInterceptor';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserBonPlanComponent } from './user-profile/user-bonplan.component';

@NgModule({
  declarations: [
    UserBonPlanComponent,
    UserProfileComponent,
    ListeVillesComponent,
    PopUpComponentUpdateBonPlan,
    AppComponent,
    ListeVilleComponent,
    ListeActiviteComponent,
    ListBonplanComponent,
    LoginComponent,
    Registration,
    PopUpComponentAddBonPlan,
    PopUpComponentAddMauvaisPlan,
    PopUpComponentUpdateBonPlan,
    PopUpComponentUpdateMauvaisPlan,
  ],
  imports: [
    NgxPageScrollCoreModule.forRoot({duration: 500}),
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
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
