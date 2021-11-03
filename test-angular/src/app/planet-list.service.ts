import { Injectable, OnInit } from '@angular/core';
import { Planet } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PlanetListService {
  planets: Planet[]
  urls=['../../assets/img/Arvala-71.png', '../../assets/img/Byss_EotECR1.png', '../../assets/img/Crait_TLJVD1.png', '../../assets/img/Hoth_AoRCR1.png', '../../assets/img/Mandaloreplanet1.png', '../../assets/img/Mustafar1.png', '../../assets/img/starwarsstars101.png', '../../assets/img/SullustAoR1.png', '../../assets/img/Tython_TOR_new1.png', '../../assets/img/PRrM7rtl.png']

  constructor(private http: HttpClient) { }

  fetchPlanets(url){
      this.http.get<Planet[]>(url)
      .subscribe(response =>{
        this.planets=response['results']
        this.planets.splice(8,1)
        // console.log(this.planets)
        for(let i=0; i<this.planets.length; i++){
          this.planets[i].url=this.urls[i]
        }
      })
  }

  sendPlanet(url, pl){
    this.http.post<Planet>(url, pl)
    .subscribe(planet=>{
      console.log(planet)
      this.planets.push(planet)
    })
  }

  getById(name: string){
    return this.planets.find(s=> s.name===name)
  }
}
