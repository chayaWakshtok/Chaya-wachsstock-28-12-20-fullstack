import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { WeatherService } from '../../shared/services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  citySearch = new FormControl('');

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {

  }

  search()
  {
    this.weatherService.getCities(this.citySearch.value).subscribe(res=>{
      this.weatherService.subjectCities.next(res);
    })
  }

}
