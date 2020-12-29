import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City } from 'src/app/shared/models/city';
import { Favorite } from 'src/app/shared/models/favorite';
import { Weather } from 'src/app/shared/models/weather';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-weater-card',
  templateUrl: './weater-card.component.html',
  styleUrls: ['./weater-card.component.scss']
})
export class WeaterCardComponent implements OnInit {

  weather: Weather;
  @Input() favorite: Favorite;
  @Output() removeFavorite: EventEmitter<string> = new EventEmitter();

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeather(this.favorite.localKey).subscribe(res => {
      this.weather = res;
    })
  }

  remove(id) {
    this.removeFavorite.emit(id);
  }


}
