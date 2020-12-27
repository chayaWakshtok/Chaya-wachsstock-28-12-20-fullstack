import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/shared/models/city';
import { Weather } from 'src/app/shared/models/weather';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'app-weater',
  templateUrl: './weater.component.html',
  styleUrls: ['./weater.component.scss']
})
export class WeaterComponent implements OnInit {

  weather: Weather;
  isFavorite: boolean = false;

  constructor(public weatherService: WeatherService,
    public favoriteService: FavoriteService,
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.weatherService.subjectWeather.subscribe(res => {
      this.weather = res;
      this.weather.city = this.weatherService.cityChoose;
      this.checkInFavorite();

    })
  }

  addToFavorite() {
    this.favoriteService.addToFavorite(this.weather);
  }

  checkInFavorite() {
    var result = this.favoriteService.getFavoriteByKey(this.weather.city.key);
    if (result)
      this.isFavorite = true;
    this.ref.detectChanges();
  }

  remove() {
    this.favoriteService.removeFavorite(this.weather.city.key);
  }

}
