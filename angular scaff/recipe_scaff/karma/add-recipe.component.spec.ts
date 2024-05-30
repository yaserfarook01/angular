import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  FormBuilder,
  MaxLengthValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddRecipeComponent } from './add-recipe.component';
import { RecipeService } from '../services/recipe.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

describe('AddRecipeComponent', () => {
  let component: AddRecipeComponent;
  let fixture: ComponentFixture<AddRecipeComponent>;
  let service: RecipeService;
  let debugElement: DebugElement;
  let formBuilder: FormBuilder;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRecipeComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule , RouterTestingModule],
      providers: [RecipeService],
    });

    formBuilder = TestBed.inject(FormBuilder) as any;
    fixture = TestBed.createComponent(AddRecipeComponent) as any;
    component = fixture.componentInstance as any;
    service = TestBed.inject(RecipeService) as any;
    fixture.detectChanges();
  });

  fit('should_create_AddRecipeComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('should_add_a_new_recipe_when_form_is_valid', () => {
    const mockRecipe = {
      name: 'Spaghetti Bolognese',
      ingredients: 'Spaghetti, ground beef, tomatoes',
      instructions: 'Cook spaghetti and ground beef separately and mix them with tomatoes.',
      prepTime: 15,
      cookTime: 20,
    };
    spyOn((service as any), 'addRecipe').and.returnValue(of(mockRecipe)); // Mock the addRecipe method
    (component as any).recipeForm.setValue(mockRecipe); // Set form values
    (component as any).addNewRecipe(); // Trigger the addNewRecipe method
    expect((component as any).recipeForm.valid).toBeTruthy();
    expect(service['addRecipe']).toHaveBeenCalledWith(mockRecipe);
  });

  fit('should_require_all_form_fields_to_be_filled_in', () => {
    const form = (component as any).recipeForm;
    form.setValue({
        name: '',
        ingredients: '',
        instructions: '',
        prepTime: '',
        cookTime: '',
    });

    expect(form.valid).toBeFalsy();
    expect(form.get('name')?.hasError('required')).toBeTruthy();
    expect(form.get('ingredients')?.hasError('required')).toBeTruthy();
    expect(form.get('instructions')?.hasError('required')).toBeTruthy();
    expect(form.get('prepTime')?.hasError('required')).toBeTruthy();
    expect(form.get('cookTime')?.hasError('required')).toBeTruthy();
  });
  fit('should_validate_recipe_name_length', () => {
    const form = component.recipeForm;
    const maxLength = 30; // Define your expected max length
  
    // Set a valid form value
    form.setValue({
      name: 'Spaghetti Bolognese',
      ingredients: 'Spaghetti, ground beef, tomatoes',
      instructions: 'Cook spaghetti and ground beef separately and mix them with tomatoes.',
      prepTime: 15,
      cookTime: 20,
    });
  
    // Verify the form is valid and the name has no 'maxlength' error
    expect(form.valid).toBeTruthy();
    expect(form.get('name')?.hasError('maxlength')).toBeFalsy();
  
    // Set an invalid form value with a long name
    form.setValue({
      name: 'A very long recipe name that should exceed the maximum length and cause an error',
      ingredients: 'Spaghetti, ground beef, tomatoes',
      instructions: 'Cook spaghetti and ground beef separately and mix them with tomatoes.',
      prepTime: 15,
      cookTime: 20,
    });
  
    // Verify the form is invalid and the name has 'maxlength' error
    expect(form.invalid).toBeTruthy();
    expect(form.get('name')?.hasError('maxlength')).toBeTruthy();
  });
  
});
