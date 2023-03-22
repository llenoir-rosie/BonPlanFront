import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeVilleComponent } from './liste-ville/liste-ville.component';
import { ListeActiviteComponent } from './liste-activite/liste-activite.component';
import { ListBonplanComponent } from './list-bonplan/list-bonplan.component';
import { ListPrecisionComponent } from './list-precision/list-precision.component';



export const routes: Routes = [
  { path: 'ville', component: ListeVilleComponent, runGuardsAndResolvers: 'always', },
  { path: 'ville/:ville.name', component: ListeActiviteComponent, runGuardsAndResolvers: 'always', },
  { path: 'ville/:ville.name/bonplan', component: ListBonplanComponent, runGuardsAndResolvers: 'always',},
  { path: 'ville/:ville.name/bonplan/precision', component: ListPrecisionComponent, runGuardsAndResolvers: 'always',},
  { path: '', redirectTo: 'ville', pathMatch: 'full' , runGuardsAndResolvers: 'always',}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
