import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddMovieComponent } from './add-movie.component';
import { MovieService } from '../services/movie.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;
  let service: MovieService;
  let debugElement: DebugElement;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMovieComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [MovieService],
    });

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(MovieService);
    fixture.detectChanges();
  });

  fit('should create AddMovieComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('should add a new movie when form is valid', () => {
    const mockMovie = {
      title: 'Inception',
      director: 'Christopher Nolan',
      releaseDate: new Date('2010-07-16'),
      genre: 'Science Fiction',
      rating: 9,
    };

    spyOn((service as any), 'addMovie').and.returnValue(of(mockMovie)); // Mock the addMovie method

    component.movieForm.setValue(mockMovie); // Set form values
    component.addNewMovie(); // Trigger the addNewMovie method

    expect(component.movieForm.valid).toBeTruthy();
    expect(service.addMovie).toHaveBeenCalledWith(mockMovie);
  });

  fit('should validate all required fields', () => {
    const form = component.movieForm;

    form.setValue({
      title: '',
      director: '',
      releaseDate: '',
      genre: '',
      rating: '',
    });

    expect(form.valid).toBeFalsy();
    expect(form.get('title')?.hasError('required')).toBeTruthy();
    expect(form.get('director')?.hasError('required')).toBeTruthy();
    expect(form.get('releaseDate')?.hasError('required')).toBeTruthy();
    expect(form.get('genre')?.hasError('required')).toBeTruthy();
    expect(form.get('rating')?.hasError('required')).toBeTruthy();
  });

  fit('should validate rating value', () => {
    const form = component.movieForm;

    form.setValue({
      title: 'Inception',
      director: 'Christopher Nolan',
      releaseDate: '2010-07-16',
      genre: 'Science Fiction',
      rating: 9,
    });

    expect(form.valid).toBeTruthy();
    expect(form.get('rating')?.hasError('min')).toBeFalsy();
    expect(form.get('rating')?.hasError('max')).toBeFalsy();

    form.setValue({
      title: 'Inception',
      director: 'Christopher Nolan',
      releaseDate: '2010-07-16',
      genre: 'Science Fiction',
      rating: 11, // Invalid rating (out of range)
    });

    expect(form.invalid).toBeTruthy();
    expect(form.get('rating')?.hasError('min')).toBeFalsy();
    expect(form.get('rating')?.hasError('max')).toBeTruthy();
  });
});
