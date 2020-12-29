import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/shared/models/city';
import { Weather } from 'src/app/shared/models/weather';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { Favorite } from 'src/app/shared/models/favorite';

@Component({
  selector: 'app-weater',
  templateUrl: './weater.component.html',
  styleUrls: ['./weater.component.scss']
})
export class WeaterComponent implements OnInit {

  weather: Weather;
  isFavorite: boolean = false;
  ip: string;
  favorite: Favorite = new Favorite();

  constructor(public weatherService: WeatherService,
    public favoriteService: FavoriteService,
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.favoriteService.getIPAddress().subscribe((res: any) => {
      this.ip = res.ip;
      this.favoriteService.getFavorites(this.ip).subscribe(res => {
        this.favoriteService.favorites = res;
      })
    })

    this.weatherService.subjectWeather.subscribe(res => {
      this.weather = res;
      this.weather.city = this.weatherService.cityChoose;
      this.checkInFavorite();

    })
  }

  addToFavorite() {
    this.favorite = new Favorite();
    this.favorite.localKey = this.weather.city.key;
    this.favorite.userIp = this.ip;
    this.favoriteService.addToFavorite(this.favorite)
      .subscribe(resAdd => {
        this.isFavorite = true;
        this.ref.detectChanges();
      })
  }

  checkInFavorite() {
    var result = this.favoriteService.getFavoriteByKey(this.weather.city.key);
    if (result)
      this.isFavorite = true;
    this.ref.detectChanges();
  }

  remove() {
    this.favoriteService.removeFavorite(this.favorite.id).subscribe(res => {
      this.favoriteService.removeLocal(this.favorite.id);
    });
  }

}
