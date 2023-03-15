import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponentActivite } from './app.activite.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'ville', component: AppComponentActivite }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
