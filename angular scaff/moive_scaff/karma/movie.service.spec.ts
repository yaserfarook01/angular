import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { Movie } from '../model/movie.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpTestingController: HttpTestingController;

  // Define mock data for movies
  const mockMovies: Movie[] = [
    {
      id: 1,
      title: 'Inception',
      director: 'Christopher Nolan',
      releaseDate: new Date('2010-07-16'),
      genre: 'Science Fiction',
      rating: 8.8,
    },
    {
      id: 2,
      title: 'The Matrix',
      director: 'Lana Wachowski, Lilly Wachowski',
      releaseDate: new Date('1999-03-31'),
      genre: 'Science Fiction',
      rating: 8.7,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });
    service = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
  });

  fit('should_create_movie_service', () => {
    expect(service).toBeTruthy();
  });

  fit('should_retrieve_movies_from_the_API_via_GET', () => {
    service.getMovies().subscribe((movies: Movie[]) => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockMovies);
  });

  fit('should_add_a_movie_via_POST', () => {
    const newMovie: Movie = {
      title: 'Interstellar',
      director: 'Christopher Nolan',
      releaseDate: new Date('2014-11-07'),
      genre: 'Science Fiction',
      rating: 8.6,
    };

    service.addMovie(newMovie).subscribe((movie) => {
      expect(movie).toEqual({ ...newMovie, id: 3 }); // Assuming the backend returns the ID
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('POST');
    req.flush({ ...newMovie, id: 3 });
  });

  fit('should_delete_a_movie_via_DELETE', () => {
    const movieId = 1;

    service.deleteMovie(movieId).subscribe(() => {
      // Additional expectations can be added here
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}/${movieId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});
