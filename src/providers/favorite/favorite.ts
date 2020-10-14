import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Dish } from "../../shared/dish";
import { Observable } from "rxjs/Observable";
import { DishProvider } from "../dish/dish";
import { Storage } from "@ionic/storage";


/*
  Generated class for the FavoriteProvider provider.
  MARIS
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: Http,
    private dishservice: DishProvider,
    private storage: Storage) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];

  }

   /** Add a Favorite Dish */
  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)){
      this.favorites.push(id);
      this.storage.set('favorites', this.favorites)};
    return true;
  }

   /** Check if the dish ID is favorite */
  isFavorite(id: number): boolean {
    console.log("test2");

    if(this.favorites){
      return this.favorites.some(el => el === id); //  Checks if at least one element of the array meets the condition
    }
  }

  /** Gets all the favorite dishes */
  getFavorites(): Observable<Dish[]> {
    console.log("test3");
    this.storage.get('favorites').then (res => {
      this.favorites = res
    });

    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => //  Map each registered dish and filter the first one that has an id included in the list of favorite dishes
          this.favorites.some(el => el === dish.id)))


  }

  /** Remove an ID from the list of favorite dishes */
  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id); //  Returns the first index at which a given element can be found
    if (index >= 0) {
      console.log("ok1");
      this.favorites.splice(index,1); //  Remove an element from the "index" index of the Favorites Array
      this.storage.set('favorites', this.favorites); // Sets favorites in list again, but without the one that got deleted
      return this.getFavorites(); // Sends new list to getFavorites

    }
    else {
      console.log("ok2");
      console.log("Deleting non-existing favorite", id);
      return Observable.throw("Deleting non-existant favorite"+id);
    }

  }

}

