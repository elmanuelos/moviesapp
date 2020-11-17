import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { NowplayingResponse, Movies } from '../interfaces/nowPlaying-response';
import { MovieResponse } from '../interfaces/movie-response';
import { CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  get params(){
    return{
      api_key: '0dc72de22da77f352b8d694c2f45b8d9',
      language: 'en-EN',
      page: this.carteleraPage.toString()
    };
  }

  // tslint:disable-next-line: typedef
  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

getMovies(): Observable<NowplayingResponse>{

  // if ( this.cargando ){  // validacion para saber si esta cargando y si es true, no hace la peticion
  //   return;
  //  }

  console.log('cargando API');

  this.cargando = true;

  return this.http.get<NowplayingResponse>(`${this.baseUrl}/movie/now_playing`, {
      params: this.params
    }).pipe(
      tap( () => { // el tap dispara un efecto secundario
          this.carteleraPage += 1;
          this.cargando = false;  // al terminar de cargar, se pone en false
      })
    );

}


searchMovies( texto: string ): Observable<Movies[]> {

  const params = {...this.params, page: '1', query: texto };

  return this.http.get<NowplayingResponse>(`${ this.baseUrl }/search/movie`, {
    params
  }).pipe(
    map( resp => resp.results )
  );

}

// tslint:disable-next-line: typedef
getMovieDetails(id: string){

  return this.http.get<MovieResponse>(`${ this.baseUrl }/movie/${ id }`,{
    params: this.params
  }).pipe(
    catchError( err => of(null) ) // manejar error cuando la pelicula id no existe
  );
}

// tslint:disable-next-line: typedef
getCast(id: string){

  return this.http.get<CreditsResponse>(`${ this.baseUrl }/movie/${ id }/credits`,{
    params: this.params
  }).pipe(
    map( resp => resp.cast), // pipe y el map sirven para solamente obtener, en este caso, el cast
    catchError( err => of([]) ) // manejar error cuando el cast viene vacio

  );
}



}
