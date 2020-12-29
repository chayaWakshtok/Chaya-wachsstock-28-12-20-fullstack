import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { Weather } from 'src/app/shared/models/weather';
import { City } from 'src/app/shared/models/city';
import { Favorite } from 'src/app/shared/models/favorite';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  ip: string;
  favorites: Favorite[] = [];

  constructor(public weatherService: WeatherService,
    public favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.favoriteService.getIPAddress().subscribe((res: any) => {
      this.ip = res.ip;
      this.favoriteService.getFavorites(this.ip).subscribe(res => {
        this.favorites = res;
        this.favoriteService.favorites = res;
      })
    })
  }

  remove(favorite) {
    this.favoriteService.removeFavorite(favorite).subscribe(res => {
      this.favoriteService.removeLocal(favorite.id);
    });
  }

}
