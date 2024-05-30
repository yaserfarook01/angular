import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
 
  movieForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private movieService: MovieService, private router: Router) {
      this.movieForm = this.formBuilder.group({
        title: ['', Validators.required],
        director: ['', Validators.required],
        releaseDate: ['', Validators.required],
        genre: ['', Validators.required],
        rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      });
  }
  ngOnInit(): void {
  }
  addNewMovie() {
    if (this.movieForm.valid) {
        console.log(this.movieForm.value);
        this.movieService.addMovie(this.movieForm.value)
            .subscribe(
                (res) => {
                    console.log(res);
                    // Navigate to movies page only after successful addition
                    this.router.navigateByUrl('/movies');
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}


}

