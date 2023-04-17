import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeVilleComponent } from './liste-ville/liste-ville.component';
import { ListeActiviteComponent } from './liste-activite/liste-activite.component';
import { ListBonplanComponent } from './list-bonplan/list-bonplan.component';
import { Registration } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListeVillesComponent } from './list-villes/list-villes.components';
import { UserAccountComponent } from './user-account/user-account.component';






const routes: Routes = [
  { path: 'ville', component: ListeVilleComponent },
  { path: 'ville/:name', component: ListeActiviteComponent },
  { path: 'ville/:name/:activity.name', component: ListBonplanComponent},
  { path: 'registration', component: Registration},
  { path : 'login', component: LoginComponent},
  { path : 'activity/:activity.name', component: ListeVillesComponent},
  { path : 'account/:currentUser', component: UserAccountComponent},
  // { path: 'ville/:ville.name/bonplan/precision', component: ListPrecisionComponent},
  { path: '', redirectTo: 'ville', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
RouterModule.forRoot(routes),
    FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
