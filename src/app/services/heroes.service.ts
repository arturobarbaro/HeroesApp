import { Injectable } from '@angular/core';
// https://angular.io/guide/http#adding-headers IMPORTANTE!!!
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from './../interfaces/heroe.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroesURL: string = "https://heroesapp-6f8ea.firebaseio.com/Heroes.json"
  heroeURL: string = "https://heroesapp-6f8ea.firebaseio.com/Heroes/"

  constructor( private http: HttpClient) { }

nuevoHeroe( heroe: Heroe) {

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  console.log(heroe)
  // https://angular.io/guide/http#making-a-post-request
  return this.http.post<Heroe>( this.heroesURL, heroe , httpOptions )
        .pipe(
        map( res => {
          console.log(res.name);
          return res;
        }));
}

 actualizarHeroe( heroe: Heroe, key$: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    // https://angular.io/guide/http#making-a-post-request
    return this.http.put<Heroe>( `${ this.heroeURL }${ key$ }.json`, heroe , httpOptions )
          .pipe(
          map( res => {
            console.log(res.name);
            return res;
          }));
  }

  getHeroe ( key$: string ) {
    let url:string = `${ this.heroeURL }${ key$ }.json`;
    console.log(url);
    return this.http.get<Heroe>( url );
  }

  getHeroes () {
    return this.http.get<Heroe>( this.heroesURL );
  }

  deleteHero ( key$: string) {
    const url = `${ this.heroeURL }${ key$ }.json`;
    console.log(url);
    return this.http.delete<Heroe>( url);
  }
}
