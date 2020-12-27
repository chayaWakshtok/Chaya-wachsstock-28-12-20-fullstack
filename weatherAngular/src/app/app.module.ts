import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { CitiesComponent } from './components/cities/cities.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { WeaterComponent } from './components/weater/weater.component';
import { WeaterCardComponent } from './components/weater-card/weater-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CitiesComponent,
    FavoriteComponent,
    WeaterComponent,
    WeaterCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
