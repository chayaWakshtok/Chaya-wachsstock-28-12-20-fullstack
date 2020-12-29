import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Favorite } from '../models/favorite';
import { Weather } from '../models/weather';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Favorite[] = [];
  ip: string;
  url: string;

  constructor(public httpClient: HttpClient) {
    this.url = baseUrl + "Favorite"
  }

  public getIPAddress() {
    return this.httpClient.get("http://api.ipify.org/?format=json");
  }

  addToFavorite(favorite: Favorite) {
    return this.httpClient.post(`${this.url}/AddFavorite`, favorite);
  }

  getFavorites(ip: string): Observable<Favorite[]> {
    return this.httpClient.get<Favorite[]>(`${this.url}/GetFavorites?ip=${ip}`);
  }

  getFavoriteByKey(key: string) {
    return this.favorites.find(p => p.localKey == key);
  }

  removeFavorite(id: number) {
    return this.httpClient.delete(`${this.url}/DeleteFavorite?id=${id}`);
  }

  removeLocal(id: number) {
    var findIndex = this.favorites.findIndex(p => p.id == id);
    if (findIndex)
      this.favorites.splice(findIndex, 1);
    return this.favorites;
  }
}
