
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { MovieResponse } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { Cast } from 'src/app/interfaces/credits-response';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  public pelicula: MovieResponse;
  public cast: Cast[] = [];

  constructor( private activatedRoute: ActivatedRoute, private movieService: MoviesService,
               private location: Location, private router: Router ) { }

  ngOnInit(): void {

    // const id = this.activatedRoute.snapshot.params.id; // para obtener el parametro id de la url

    const { id } = this.activatedRoute.snapshot.params; // desestructuracion: esto se puede usar cuando se tiene mas argumentos

    console.log(id);

    this.movieService.getMovieDetails( id ).subscribe ( movie => {

     if ( !movie ) { // validacion si la movie no existe, te lleva al home
        alert('Movie id is not valid');
        this.router.navigateByUrl('/home');
        return;
     }

      // console.log( movie );
     this.pelicula = movie;
     });

    this.movieService.getCast( id ).subscribe( cast =>{
       console.log(cast);

       this.cast = cast;
     });

  }

  // tslint:disable-next-line: typedef
  onBack() {
    this.location.back();
  }


}
