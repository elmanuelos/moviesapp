import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

import { Movies } from '../../interfaces/nowPlaying-response';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movies[] = [];
  public moviesSlideshow: Movies[] = [];

  @HostListener('window:scroll', ['$event'])
  // tslint:disable-next-line: typedef
  onScroll(){
    //console.log('Hola');

    const posicion = (document.documentElement.scrollTop || document.body.scrollTop) + 1300; // threshold
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (posicion > max){ // si la posicion que me encuentre es mayor al espacio maximo que se tiene
      // llamar servicio

      if (this.moviesService.cargando){ return; }

      this.moviesService.getMovies().subscribe( resp => {
          this.movies.push(...resp.results); // ...operador spread para extraer todo lo que esta en la respuesta
      });

    }
    console.log(posicion, max);

  }

  constructor(private moviesService: MoviesService){


  }


  ngOnInit(): void {

    this.moviesService.getMovies().subscribe(resp => {
      // console.log(resp);
      this.movies = resp.results;
      this.moviesSlideshow = resp.results;
    });

  }

  ngOnDestroy(): void{
    this.moviesService.resetCarteleraPage();
  }


}
