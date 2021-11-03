import { Component, OnInit } from '@angular/core';
import { Planet } from '../interfaces';
import { PlanetListService } from '../planet-list.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  planet: Planet

  constructor(private route: ActivatedRoute,
    public planetsService: PlanetListService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.planet = this.planetsService.getById(params.name)
      console.log(this.planet)
    })
  }

}
