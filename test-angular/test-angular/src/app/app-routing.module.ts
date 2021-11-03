import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetComponent } from './planet/planet.component';
import { AllPlanetsComponent } from './all-planets/all-planets.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CharactersComponent } from './characters/characters.component';
import { LocationsComponent } from './locations/locations.component';


const routes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full', children: [
    {path: 'all', component: AllPlanetsComponent}
  ]},
  {path: 'characters', component: CharactersComponent},
  {path: 'locations', component: LocationsComponent},
  {path: ':name', component: PlanetComponent},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
