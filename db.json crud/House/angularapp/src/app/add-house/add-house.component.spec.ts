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
import { AddHouseComponent } from './add-house.component';
import { HouseService } from '../services/house.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

describe('AddHouseComponent', () => {
  let component: AddHouseComponent;
  let fixture: ComponentFixture<AddHouseComponent>;
  let service: HouseService;
  let debugElement: DebugElement;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHouseComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [HouseService],
    });

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(AddHouseComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HouseService);
    fixture.detectChanges();
  });

  fit('should_create_AddHouseComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('should_add_a_new_house_when_form_is_valid', () => {
    const mockHouse = {
      address: '123 Elm Street',
      type: 'Detached',
      yearBuilt: 2020,
      color: 'Red',
      size: 1500,
      bedrooms: 3,
      bathrooms: 2
    };
    
    spyOn(service, 'addHouse').and.returnValue(of(mockHouse)); // Mock the addHouse method
    
    component.houseForm.setValue(mockHouse); // Set form values
    component.addNewHouse(); // Trigger the addNewHouse method
    
    expect(component.houseForm.valid).toBeTruthy();
    expect(service.addHouse).toHaveBeenCalledWith(mockHouse);
  });

  fit('should_require_all_form_fields_to_be_filled_in', () => {
    const form = component.houseForm;
    
    form.setValue({
      address: '',
      type: '',
      yearBuilt: '',
      color: '',
      size: '',
      bedrooms: '',
      bathrooms: ''
    });

    expect(form.valid).toBeFalsy();
    expect(form.get('address')?.hasError('required')).toBeTruthy();
    expect(form.get('type')?.hasError('required')).toBeTruthy();
    expect(form.get('yearBuilt')?.hasError('required')).toBeTruthy();
    expect(form.get('color')?.hasError('required')).toBeTruthy();
    expect(form.get('size')?.hasError('required')).toBeTruthy();
    expect(form.get('bedrooms')?.hasError('required')).toBeTruthy();
    expect(form.get('bathrooms')?.hasError('required')).toBeTruthy();
  });

  fit('should_validate_house_address_length', () => {
    const form = component.houseForm;
    const maxLength = 75; // Define your expected max length for address
    
    // Set a valid form value
    form.setValue({
      address: '123 Elm Street',
      type: 'Detached',
      yearBuilt: 2020,
      color: 'Red',
      size: 1500,
      bedrooms: 3,
      bathrooms: 2
    });
    
    // Verify the form is valid and the address has no 'maxlength' error
    expect(form.valid).toBeTruthy();
    expect(form.get('address')?.hasError('maxlength')).toBeFalsy();
    
    // Set an invalid form value with a long address
    form.setValue({
      address: 'A very long house address that should exceed the maximum length and cause an error',
      type: 'Detached',
      yearBuilt: 2020,
      color: 'Red',
      size: 1500,
      bedrooms: 3,
      bathrooms: 2
    });
    
    // Verify the form is invalid and the address has 'maxlength' error
    expect(form.invalid).toBeTruthy();
    expect(form.get('address')?.hasError('maxlength')).toBeTruthy();
  });
});
