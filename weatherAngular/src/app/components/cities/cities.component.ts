import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/shared/models/city';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  cities: City[] = [];
  keyChoose: string;

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.subjectCities.subscribe(res => {
      this.cities = res;
    })
  }

  choose(city:City) {
    this.keyChoose = city.key;
    this.weatherService.cityChoose=city;
    this.weatherService.getWeather(this.keyChoose).subscribe(res=>{
      this.weatherService.subjectWeather.next(res);
    })
  }

}
