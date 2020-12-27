import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City } from 'src/app/shared/models/city';
import { Weather } from 'src/app/shared/models/weather';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-weater-card',
  templateUrl: './weater-card.component.html',
  styleUrls: ['./weater-card.component.scss']
})
export class WeaterCardComponent implements OnInit {

  weather: Weather;
  @Input() city: City;
  @Output() removeFavorite: EventEmitter<string> = new EventEmitter();

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeather(this.city.key).subscribe(res => {
      this.weather = res;
      this.weather.city = this.city;
    })
  }

  remove(key) {
    this.removeFavorite.emit(key);
  }


}
