import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes/Recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { Subscription, map, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService  implements OnDestroy {

  // Recipes
  recipes : Recipe[] = [];

  // Firebase Realtime Database URL
  url = "https://recipe-book-e9bbb-default-rtdb.firebaseio.com/recipes.json";

  // Subscriptions
  subscriptions: Subscription[] = []

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  // Store Recipes in the Database
  storeRecipes() {

    this.subscriptions.push(this.recipeService.getRecipes().subscribe({
      next: (data: Recipe[]) => {
        this.subscriptions.push(this.http.put(this.url, data).subscribe({
          next: data => {
            console.log("Recipes Saved to the Database", data);
          },
          error: err => {
            console.log("Error while saving Recipes to the Database", err)
          }
        }));
      }
    }))
    
  }

  // Fetch Recipes from the Database
  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url).pipe(
      // On the observable returned in switchMap above, below operators are applied
      map(data => {
        data.forEach(recipe => {
          recipe.ingredients = recipe.ingredients || []
        })
        return data;
      }), 
      tap( data => this.recipeService.setRecipes(data))
    )
   
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
