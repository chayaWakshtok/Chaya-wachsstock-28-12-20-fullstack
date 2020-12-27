import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { Weather } from 'src/app/shared/models/weather';
import { City } from 'src/app/shared/models/city';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  favorites: City[] = [];

  constructor(public weatherService: WeatherService,
    public favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.favorites = this.favoriteService.getFavorites();
  }

  remove(favorite) {
    this.favorites = this.favoriteService.removeFavorite(favorite);
  }

}
