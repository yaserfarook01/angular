import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie.model';  // Update import to reference the movie model

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private backendUrl = 'https://ide-adbcaabfacacdfbabefaaddbafbefbdcbddbeb.premiumproject.examly.io/proxy/3002/movies';  // Update the backend URL for movies

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    // Fetch a list of movies from the backend
    return this.http.get<Movie[]>(this.backendUrl);
  }

  addMovie(movie: Movie): Observable<Movie> {
    // Add a new movie to the backend
    return this.http.post<Movie>(this.backendUrl, movie);
  }

  deleteMovie(id: number): Observable<void> {
    // Delete a movie from the backend using its ID
    const url = `${this.backendUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
