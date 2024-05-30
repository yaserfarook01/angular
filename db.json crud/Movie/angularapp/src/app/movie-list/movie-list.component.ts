import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/movie.model';  // Update the import to refer to the movie model
import { MovieService } from '../services/movie.service';  // Update the import to refer to the movie service

@Component({
  selector: 'app-movie-list',  // Update the component selector
  templateUrl: './movie-list.component.html',  // Update the template URL
  styleUrls: ['./movie-list.component.css']  // Update the styles URL
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];  // Update the variable name and type

  constructor(private movieService: MovieService) { }  // Update the service variable and type

  ngOnInit(): void {
    this.getMovies();  // Update the method name
  }

  getMovies(): void {  // Update the method name
    try {
      this.movieService.getMovies()  // Update the service method call
        .subscribe((res) => {
          console.log(res);
          this.movies = res;
        }, (err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("Error", err);
    }
  }

  deleteMovie(id: any): void {  // Update the method name and parameter
    this.movieService.deleteMovie(id)  // Update the service method call
      .subscribe(() => {
        // Remove the deleted movie from the list
        this.movies = this.movies.filter(movie => movie.id !== id);
      });
  }
}
