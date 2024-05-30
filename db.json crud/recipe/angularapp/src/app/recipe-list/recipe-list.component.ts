import { Component, OnInit } from '@angular/core';
import { recipe } from '../model/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    try{
    this.recipeService.getRecipes()
      .subscribe((res) => {
       console.log(res)
        this.recipes = res
      },(err)=>{
        console.log(err)
      });
  }catch(err){
    console.log("Err",err)
  }
}

  deleteRecipe(id: any): void {
    this.recipeService.deleteRecipe(id)
      .subscribe(() => {
        // Remove the deleted recipe from the list
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
      });
  }
}
