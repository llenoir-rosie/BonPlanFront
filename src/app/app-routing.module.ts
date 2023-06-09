import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeVilleComponent } from './liste-ville/liste-ville.component';
import { ListeActiviteComponent } from './liste-activite/liste-activite.component';
import { ListBonplanComponent } from './list-bonplan/list-bonplan.component';
import { Registration } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListeVillesComponent } from './list-villes/list-villes.components';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserBonPlanComponent } from './user-profile/user-bonplan.component';
import { UserMauvaisPlanComponent } from './user-profile/user-mauvaisplan.component'





const routes: Routes = [
  { path: 'ville', component: ListeVilleComponent },
  { path: 'ville/:name', component: ListeActiviteComponent },
  { path: 'ville/:name/:activity.name', component: ListBonplanComponent},
  { path: 'registration', component: Registration},
  { path : 'login', component: LoginComponent},
  { path : 'activity/:activity.name', component: ListeVillesComponent},
  // { path: 'ville/:ville.name/bonplan/precision', component: ListPrecisionComponent},
  { path: '', redirectTo: 'ville', pathMatch: 'full' },
  { path : 'profile/:currentUser', component : UserProfileComponent},
  { path : 'userbonplans/:currentUser', component : UserBonPlanComponent},
  { path : 'usermauvaisplans/:currentUser', component : UserMauvaisPlanComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
RouterModule.forRoot(routes),
    FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
