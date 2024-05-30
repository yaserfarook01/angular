import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
 
  recipeForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private router: Router) {
// Define the form group with the necessary form controls and validators
this.recipeForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(75)]],
    ingredients: ['', Validators.required],
    instructions: ['', Validators.required],
    prepTime: ['', Validators.required],
    cookTime: ['', Validators.required],
});

}
  ngOnInit(): void {
  }
  addNewRecipe() {
    if (this.recipeForm.valid) {
        console.log(this.recipeForm.value);
        this.recipeService.addRecipe(this.recipeForm.value)
            .subscribe(
                (res) => {
                    console.log(res);
                    // Navigate to recipes page only after successful addition
                    this.router.navigateByUrl('/recipes');
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}


}

