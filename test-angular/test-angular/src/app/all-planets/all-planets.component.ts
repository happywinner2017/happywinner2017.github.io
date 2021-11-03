import { Component, OnInit } from '@angular/core';
import { PlanetListService } from '../planet-list.service';
import { Planet } from '../interfaces';

@Component({
  selector: 'app-all-planets',
  templateUrl: './all-planets.component.html',
  styleUrls: ['./all-planets.component.scss']
})
export class AllPlanetsComponent implements OnInit {
  pages=['https://swapi.dev/api/planets', 'https://swapi.dev/api/planets/?page=2']
  toggle=true
  planetName=''
  planetDiameter: number

  constructor(public planetsService: PlanetListService) { }

  ngOnInit(): void {
    this.planetsService.fetchPlanets(this.pages[0])
  }

  showMore(){
    this.planetsService.fetchPlanets(this.pages[1])
    this.toggle=false
  }
  showBack(){
    this.toggle=true
    this.planetsService.fetchPlanets(this.pages[0])
  }
  addPlanet(){
    if(!this.planetName.trim()){
      return
    }
    const newPlanet: Planet={
      name: this.planetName,
      // rotation_period: number,
      // orbital_period: number,
      // diameter: number,
      // climate: string,
      // gravity: string,
      // terrain:string,
      // surface_water: number,
      // population: number,
      url: this.planetsService.urls[9]
    }
    this.planetsService.sendPlanet('https://jsonplaceholder.typicode.com/todos/', newPlanet)
    this.planetName=''
  }
}
