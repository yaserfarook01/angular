import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddCarComponent } from './add-car.component';
import { CarService } from '../services/car.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

describe('AddCarComponent', () => {
  let component: AddCarComponent;
  let fixture: ComponentFixture<AddCarComponent>;
  let service: CarService;
  let debugElement: DebugElement;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCarComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [CarService],
    });

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(AddCarComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CarService);
    fixture.detectChanges();
  });

  fit('should_create_AddCarComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('should_add_a_new_car_when_form_is_valid', () => {
    const mockCar = {
      model: 'Model S',
      make: 'Tesla',
      year: 2022,
      color: 'Red',
      mileage: 15000
    };
    
    spyOn(service, 'addCar').and.returnValue(of(mockCar)); // Mock the addCar method
    
    component.carForm.setValue(mockCar); // Set form values
    component.addNewCar(); // Trigger the addNewCar method
    
    expect(component.carForm.valid).toBeTruthy();
    expect(service.addCar).toHaveBeenCalledWith(mockCar);
  });

  fit('should_require_all_form_fields_to_be_filled_in', () => {
    const form = component.carForm;
    
    form.setValue({
        model: '',
        make: '',
        year: '',
        color: '',
        mileage: ''
    });

    expect(form.valid).toBeFalsy();
    expect(form.get('model')?.hasError('required')).toBeTruthy();
    expect(form.get('make')?.hasError('required')).toBeTruthy();
    expect(form.get('year')?.hasError('required')).toBeTruthy();
    expect(form.get('color')?.hasError('required')).toBeTruthy();
    expect(form.get('mileage')?.hasError('required')).toBeTruthy();
  });

  fit('should_validate_car_model_length', () => {
    const form = component.carForm;
    const maxLength = 30; // Define your expected max length
    
    // Set a valid form value
    form.setValue({
      model: 'Model S',
      make: 'Tesla',
      year: 2022,
      color: 'Red',
      mileage: 15000
    });
    
    // Verify the form is valid and the model has no 'maxlength' error
    expect(form.valid).toBeTruthy();
    expect(form.get('model')?.hasError('maxlength')).toBeFalsy();
    
    // Set an invalid form value with a long model name
    form.setValue({
      model: 'A very long car model name that should exceed the maximum length and cause an error',
      make: 'Tesla',
      year: 2022,
      color: 'Red',
      mileage: 15000
    });
    
    // Verify the form is invalid and the model has 'maxlength' error
    expect(form.invalid).toBeTruthy();
    expect(form.get('model')?.hasError('maxlength')).toBeTruthy();
  });
});
