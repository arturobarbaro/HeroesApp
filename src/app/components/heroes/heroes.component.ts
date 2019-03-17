import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { Heroe } from 'src/app/interfaces/heroe.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes:Heroe[] = [];

  constructor(private _heroesService:HeroesService,
              private router:Router) {
    this._heroesService.getHeroes().subscribe(
        data=>{
            console.log(data)
            this.heroes=data;
        }
    )
  }

  ngOnInit() {
  }

  eliminarHeroe ( key$: string) {
    this._heroesService.eliminarHeroe(key$).subscribe(respuesta=>{
        if(respuesta){
            //error
        } else {
            delete this.heroes[key$];
        }
    })
  }

}
