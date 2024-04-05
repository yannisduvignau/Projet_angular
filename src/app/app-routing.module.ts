import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GererInterComponent } from './gerer-inter/gerer-inter.component';
import { CreerInterComponent } from './creer-inter/creer-inter.component';
import { ModifierInterComponent } from './modifier-inter/modifier-inter.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path:'gererInter',
    component:GererInterComponent
  }
  ,
  {
    path:'creerInter',
    component:CreerInterComponent
  },
  {
    path:'modifierInter/:id',
    component:ModifierInterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
