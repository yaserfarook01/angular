import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;
  let httpTestingController: HttpTestingController;

  const mockRecipes = [
    {
      id: 1,
      name: 'Pasta Bolognese',
      ingredients: 'Pasta, Tomato sauce, Ground beef, Garlic, Onion, Olive oil',
      instructions: 'Boil pasta, prepare sauce, combine and serve',
      prepTime: 15,
      cookTime: 30,
    },
    {
      id: 2,
      name: 'Chicken Curry',
      ingredients: 'Chicken, Curry powder, Coconut milk, Onion, Garlic, Ginger',
      instructions: 'Cook chicken with spices, add coconut milk, and simmer',
      prepTime: 20,
      cookTime: 40,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecipeService],
    });
    service = TestBed.inject(RecipeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
  });

  fit('should_create_recipe_service', () => {
    expect(service).toBeTruthy();
  });

  fit('should_retrieve_recipes_from_the_API_via_GET', () => {
    service.getRecipes().subscribe((recipes: any) => {
      expect(recipes).toEqual(mockRecipes);
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockRecipes);
  });

  fit('should_add_a_recipe_via_POST', () => {
    const newRecipe = {
      name: 'Grilled Cheese Sandwich',
      ingredients: 'Bread, Cheese, Butter',
      instructions: 'Butter bread, add cheese, grill until golden',
      prepTime: 5,
      cookTime: 5,
    };

    service.addRecipe(newRecipe).subscribe((recipe) => {
      expect(recipe).toEqual(newRecipe);
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('POST');
    req.flush(newRecipe);
  });

  fit('should_delete_a_recipe_via_DELETE', () => {
    const recipeId = 1;

    service.deleteRecipe(recipeId).subscribe(() => {});

    const req = httpTestingController.expectOne(`${service['backendUrl']}/${recipeId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});
