import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home' , loadChildren: () => import('./home/home.module').then(x => x.HomeModule)
  },
  {
    path: 'patient' , loadChildren: () => import('./patient/patient.module').then(x => x.PatientModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
