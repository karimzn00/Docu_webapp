import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { BodyComponent } from './shared/body/body.component';
import { AddComponent } from './modules/add/add.component';


const routes: Routes = [
  { path : '', component : BodyComponent},
  { path : 'add', component : AddComponent}

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
