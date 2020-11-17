import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movies } from 'src/app/interfaces/nowPlaying-response';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // tslint:disable-next-line: no-inferrable-types
  public texto: string = '';
  public  movies: Movies[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private moviesService: MoviesService ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      console.log(params.texto);

      this.texto = params.texto;

      // llamar el servicio para buscar peliculas. Ponerlo en services

      this.moviesService.searchMovies(params.texto).subscribe( movies => {
        console.log(movies);
        this.movies = movies;
      });

    });

  }

}
