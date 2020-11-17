import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movies } from 'src/app/interfaces/nowPlaying-response';


@Component({
  selector: 'app-movies-poster-grid',
  templateUrl: './movies-poster-grid.component.html',
  styleUrls: ['./movies-poster-grid.component.css']
})
export class MoviesPosterGridComponent implements OnInit {

  @Input() movies: Movies[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.movies)
  }

  detalleMovie(movie: Movies){

    //alert(movie.id);

    this.router.navigate(['/movie', movie.id ]);

  }

}
