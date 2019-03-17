import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from 'src/app/interfaces/heroe.interface';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: Heroe = {
    name:"",
    bio:"",
    company:"Marvel"
  }

  nuevo:boolean = false;
  id:string;

  constructor(
    private _heroesService:HeroesService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe( parametros => this.id=parametros['id']);
  }

  ngOnInit() {
  }

  guardar(){
    console.log(this.heroe);
    if( this.id=="nuevo") {
      //inserta
      this._heroesService.nuevoHeroe(this.heroe)
      .subscribe(
          data=>{
            this.router.navigate(['/heroe/',data.name])
          },
          error=>console.error(error)
      );
  } else {
      //actualiza
      this._heroesService.actualizarHeroe(this.heroe,this.id).subscribe(
          data=>{
              console.log(data)
          },
          error=>console.error(error)
      )
  }
  }

}
