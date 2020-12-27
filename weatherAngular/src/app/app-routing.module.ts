import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { component: SearchComponent, path: "" },
  { component: FavoriteComponent, path: "favorites" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
