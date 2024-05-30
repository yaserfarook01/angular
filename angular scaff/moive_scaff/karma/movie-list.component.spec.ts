import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';  // Update import to refer to movie list component
import { MovieService } from '../services/movie.service';  // Update import to refer to movie service
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MovieListComponent', () => {  // Update describe block name
  let component: MovieListComponent;  // Update component type
  let fixture: ComponentFixture<MovieListComponent>;  // Update fixture type
  let service: MovieService;  // Update service type

  const mockMovies = [
    {
      id: 1,
      title: 'Inception',
      director: 'Christopher Nolan',
      releaseDate: new Date('2010-07-16'),
      genre: 'Sci-Fi',
      rating: 8.8,
    },
    {
      id: 2,
      title: 'The Dark Knight',
      director: 'Christopher Nolan',
      releaseDate: new Date('2008-07-18'),
      genre: 'Action',
      rating: 9.0,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListComponent],  // Update declaration
      providers: [MovieService],  // Update provider
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(MovieListComponent);  // Update the component
    component = fixture.componentInstance;
    service = TestBed.inject(MovieService);  // Update service
  });

  fit('should_create_MovieListComponent', () => {  // Update test case name
    expect(component).toBeTruthy();
  });

  fit('should_call_getMovies', () => {  // Update test case name
    spyOn((service as any), 'getMovies').and.returnValue(of([]));
    (component as any).getMovies();
    expect((component as any).getMovies).toBeDefined();
    expect((component as any).getMovies instanceof Function).toBeTruthy();
    expect((service as any).getMovies).toHaveBeenCalled();
  });

  fit('should_call_deleteMovie', () => {  // Update test case name
    spyOn((service as any), 'deleteMovie').and.returnValue(of());
    (component as any).deleteMovie();
    expect((component as any).deleteMovie).toBeDefined();
    expect((component as any).deleteMovie instanceof Function).toBeTruthy();
    expect((service as any).deleteMovie).toHaveBeenCalled();
  });
});
