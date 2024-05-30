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
import { AddLaptopComponent } from './add-laptop.component'; // Update import
import { LaptopService } from '../services/laptop.service'; // Update import
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

describe('AddLaptopComponent', () => { // Update component name
  let component: AddLaptopComponent; // Update component type
  let fixture: ComponentFixture<AddLaptopComponent>; // Update component type
  let service: LaptopService; // Update service type
  let debugElement: DebugElement;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLaptopComponent], // Update component name
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [LaptopService], // Update service name
    });

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(AddLaptopComponent); // Update component name
    component = fixture.componentInstance; // Update component type
    service = TestBed.inject(LaptopService); // Update service name
    fixture.detectChanges();
  });

  fit('should_create_AddLaptopComponent', () => { // Update test description
    expect(component).toBeTruthy();
  });

  fit('should_add_a_new_laptop_when_form_is_valid', () => { // Update test description
    const mockLaptop = { // Update mockLaptop
      brand: 'HP',
      model: 'Pavilion',
      screenSize: 15.6,
      ram: 8,
      storage: 512,
      processor: 'Intel Core i5',
      graphicsCard: 'NVIDIA GeForce GTX 1650'
    };
    
    spyOn(service, 'addLaptop').and.returnValue(of(mockLaptop)); // Mock the addLaptop method
    
    component.laptopForm.setValue(mockLaptop); // Set form values
    component.addNewLaptop(); // Trigger the addNewLaptop method
    
    expect(component.laptopForm.valid).toBeTruthy();
    expect(service.addLaptop).toHaveBeenCalledWith(mockLaptop);
  });

  fit('should_require_all_form_fields_to_be_filled_in', () => { // Update test description
    const form = component.laptopForm; // Update form name
    
    form.setValue({
      brand: '',
      model: '',
      screenSize: '',
      ram: '',
      storage: '',
      processor: '',
      graphicsCard: ''
    });

    expect(form.valid).toBeFalsy();
    expect(form.get('brand')?.hasError('required')).toBeTruthy();
    expect(form.get('model')?.hasError('required')).toBeTruthy();
    expect(form.get('screenSize')?.hasError('required')).toBeTruthy();
    expect(form.get('ram')?.hasError('required')).toBeTruthy();
    expect(form.get('storage')?.hasError('required')).toBeTruthy();
    expect(form.get('processor')?.hasError('required')).toBeTruthy();
    expect(form.get('graphicsCard')?.hasError('required')).toBeTruthy();
  });

  fit('should_validate_laptop_brand_length', () => { // Update test description
    const form = component.laptopForm; // Update form name
    const maxLength = 50; // Define your expected max length for brand
    
    // Set a valid form value
    form.setValue({
      brand: 'HP',
      model: 'Pavilion',
      screenSize: 15.6,
      ram: 8,
      storage: 512,
      processor: 'Intel Core i5',
      graphicsCard: 'NVIDIA GeForce GTX 1650'
    });
    
    // Verify the form is valid and the brand has no 'maxlength' error
    expect(form.valid).toBeTruthy();
    expect(form.get('brand')?.hasError('maxlength')).toBeFalsy();
    
    // Set an invalid form value with a long brand
    form.setValue({
      brand: 'A very long laptop brand that should exceed the maximum length and cause an error',
      model: 'Pavilion',
      screenSize: 15.6,
      ram: 8,
      storage: 512,
      processor: 'Intel Core i5',
      graphicsCard: 'NVIDIA GeForce GTX 1650'
    });
    
    // Verify the form is invalid and the brand has 'maxlength' error
    expect(form.invalid).toBeTruthy();
    expect(form.get('brand')?.hasError('maxlength')).toBeTruthy();
  });
});
