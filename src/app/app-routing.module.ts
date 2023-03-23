import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeVilleComponent } from './liste-ville/liste-ville.component';
import { ListeActiviteComponent } from './liste-activite/liste-activite.component';
import { ListBonplanComponent } from './list-bonplan/list-bonplan.component';
import { ListPrecisionComponent } from './list-precision/list-precision.component';
import { FormsModule } from '@angular/forms';
import { EditbonplanComponent } from './list-bonplan/editbonplan/editbonplan.component';



const routes: Routes = [
  { path: 'edit/bonplan', component: EditbonplanComponent },
  { path: 'ville', component: ListeVilleComponent },
  { path: 'ville/:ville.name', component: ListeActiviteComponent },
  { path: 'ville/:ville.name/:act.name', component: ListBonplanComponent},
  { path: 'ville/:ville.name/bonplan/precision', component: ListPrecisionComponent},
  { path: '', redirectTo: 'ville', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
