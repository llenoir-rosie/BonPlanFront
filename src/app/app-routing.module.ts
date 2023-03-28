import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeVilleComponent } from './liste-ville/liste-ville.component';
import { ListeActiviteComponent } from './liste-activite/liste-activite.component';
import { ListBonplanComponent } from './list-bonplan/list-bonplan.component';
import { ListPrecisionComponent } from './list-precision/list-precision.component';
import { Registration } from './registration/registration.component';
import { FormsModule } from '@angular/forms';





const routes: Routes = [
  { path: 'ville', component: ListeVilleComponent },
  { path: 'ville/:name', component: ListeActiviteComponent },
  { path: 'ville/:name/:activity.name', component: ListBonplanComponent},
  { path: 'registration', component: Registration},
  // { path: 'ville/:ville.name/bonplan/precision', component: ListPrecisionComponent},
  { path: '', redirectTo: 'ville', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
RouterModule.forRoot(routes),
    FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }