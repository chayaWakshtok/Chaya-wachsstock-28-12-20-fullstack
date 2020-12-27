import { Injectable } from '@angular/core';
import { City } from '../models/city';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: City[] = [];

  constructor() { }

  addToFavorite(weather: Weather) {
    this.favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!this.favorites)
      this.favorites = [];
    this.favorites.push(weather.city);
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  getFavorites() {
    this.favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!this.favorites)
      this.favorites = [];
    return this.favorites;
  }

  getFavoriteByKey(key: string) {
    this.getFavorites();
    return this.favorites.find(p => p.key == key);
  }

  removeFavorite(key: string) {
    var findIndex = this.favorites.findIndex(p => p.key == key);
    if(findIndex)
    this.favorites.splice(findIndex,1);
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
    return this.favorites;
  }
}
