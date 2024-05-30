import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { recipe } from '../model/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private backendUrl = 'https://ide-adbcaabfacacdfbabefaaddbafbefbdcbddbeb.premiumproject.examly.io/proxy/3001/recipes'; 

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<recipe[]> {
    return this.http.get<recipe[]>(this.backendUrl);
  }

  addRecipe(recipe: recipe): Observable<recipe> {
    return this.http.post<recipe>(this.backendUrl, recipe);
  }

  // Delete a recipe from the backend
  deleteRecipe(id: number): Observable<void> {
    const url = `${this.backendUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
