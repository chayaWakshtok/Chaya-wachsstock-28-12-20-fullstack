import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { City } from '../models/city';
import { Weather } from '../models/weather';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  url: string;
  subjectCities: Subject<City[]> = new Subject();
  subjectWeather: Subject<Weather> = new Subject();
  cityChoose: City;

  constructor(public httpClient: HttpClient) {
    this.url = baseUrl + "weather"
  }

  getCities(search: string): Observable<City[]> {
    return this.httpClient.get<City[]>(`${this.url}/GetCities?city=${search}`);
  }

  getWeather(localKey: string): Observable<Weather> {
    return this.httpClient.get<Weather>(`${this.url}/GetWeather?localKey=${localKey}`);
  }

}
