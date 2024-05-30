import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeService } from '../services/recipe.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
 
describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let service: RecipeService;
 
  const mockRecipes = [
    {
      id: 1,
      number: 12,
      title: 'Spaghetti Bolognese',
      ingredients: 'Spaghetti, ground beef, tomato sauce, garlic, onions, etc.',
      instructions: 'Cook spaghetti, cook beef, mix with sauce, serve.',
      prepTime: 45,
    },
    {
      id: 2,
      number: 2,
      title: 'Chicken Curry',
      ingredients: 'Chicken, curry paste, coconut milk, vegetables, etc.',
      instructions: 'Cook chicken, mix with curry paste and vegetables, serve with rice.',
      prepTime: 60,
    },
  ];
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeListComponent],
      providers: [RecipeService],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RecipeService);
  });
 
  fit('should_create_RecipeListComponent', () => {
    expect(component).toBeTruthy();
  });
 
  fit('should_call_getRecipes', () => {
    spyOn(service, 'getRecipes').and.returnValue(of([]));
    component.getRecipes();
    expect(component.getRecipes).toBeDefined();
    expect(component.getRecipes instanceof Function).toBeTruthy();
    expect(service.getRecipes).toHaveBeenCalled();
  });

  fit('should_call_deleteRecipe', () => {
    spyOn(service, 'deleteRecipe').and.returnValue(of());
    component.deleteRecipe(1); // You can pass a valid recipe ID
    expect(component.deleteRecipe).toBeDefined();
    expect(component.deleteRecipe instanceof Function).toBeTruthy();
    expect(service.deleteRecipe).toHaveBeenCalledWith(1);
  });

});
