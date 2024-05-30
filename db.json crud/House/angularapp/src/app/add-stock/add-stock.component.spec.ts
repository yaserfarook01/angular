import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddStockComponent } from './add-stock.component'; // Update import
import { StockService } from '../services/stock.service'; // Update import
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

describe('AddStockComponent', () => { // Update component name
  let component: AddStockComponent; // Update component type
  let fixture: ComponentFixture<AddStockComponent>; // Update component type
  let service: StockService; // Update service type
  let debugElement: DebugElement;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStockComponent], // Update component name
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [StockService], // Update service name
    });

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(AddStockComponent); // Update component name
    component = fixture.componentInstance; // Update component type
    service = TestBed.inject(StockService); // Update service name
    fixture.detectChanges();
  });

  fit('should_create_AddStockComponent', () => { // Update test description
    expect(component).toBeTruthy();
  });

  fit('should_add_a_new_stock_when_form_is_valid', () => { // Update test description
    const mockStock = { // Update mockStock
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      price: 145.12,
      change: '+2.45'
    };
    
    spyOn(service, 'addStock').and.returnValue(of(mockStock)); 
    
    (component as any).stockForm.setValue(mockStock); // Set form values
    (component as any).addNewStock(); // Trigger the addNewStock method
    
    expect((component as any).stockForm.valid).toBeTruthy();
    expect((service as any).addStock).toHaveBeenCalledWith(mockStock);
  });

  fit('should_require_all_form_fields_to_be_filled_in', () => { // Update test description
    const form = (component as any).stockForm; // Update form name
    
    form.setValue({
      symbol: '',
      companyName: '',
      price: '',
      change: ''
    });

    expect(form.valid).toBeFalsy();
    expect(form.get('symbol')?.hasError('required')).toBeTruthy();
    expect(form.get('companyName')?.hasError('required')).toBeTruthy();
    expect(form.get('price')?.hasError('required')).toBeTruthy();
    expect(form.get('change')?.hasError('required')).toBeTruthy();
  });
  
  fit('should_validate_stock_symbol_length', () => { // Update test description
    const form = (component as any).stockForm; // Update form name
    const maxLength = 10; // Define your expected max length for symbol
    
    // Set a valid form value
    form.setValue({
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      price: 145.12,
      change: '+2.45'
    });
    
    // Verify the form is valid and the symbol has no 'maxlength' error
    expect(form.valid).toBeTruthy();
    expect(form.get('symbol')?.hasError('maxlength')).toBeFalsy();
    
    // Set an invalid form value with a long symbol
    form.setValue({
      symbol: 'VERYLONGSYMBOL',
      companyName: 'Apple Inc.',
      price: 145.12,
      change: '+2.45'
    });
    
    // Verify the form is invalid and the symbol has 'maxlength' error
    expect(form.invalid).toBeTruthy();
    expect(form.get('symbol')?.hasError('maxlength')).toBeTruthy();
});

  // Add more test cases for validation and behavior testing
});


