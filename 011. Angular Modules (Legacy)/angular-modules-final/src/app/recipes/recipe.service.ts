import { Injectable } from '@angular/core';
import { Recipe } from './Recipe.model';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class RecipeService {

  private _recipes: Recipe[] = [];

  // Recipes Subject
  private recipes = new BehaviorSubject<Recipe[]>(this._recipes.slice());

  constructor(private shoppingListService: ShoppingListService) {}

  // Override the Recipes list
  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes
    this.recipes.next(this._recipes.slice());
  }

  getRecipes() {
    // Use slice without arguments so we only return a copy
    // Not the actual list of recipes
    return this.recipes;
  }

  // Return a specific recipe
  getRecipe(id: string) {
    return this._recipes.filter((recipe) => recipe.id == id)[0];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredients);
  }

  // Add a new Recipe
  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
    this.recipes.next(this._recipes.slice());
  }

  // Update an existing Recipe
  updateRecipe(id: string, recipe: Recipe) {

    const index = this._recipes.findIndex(recipe => recipe.id == id);
    this._recipes[index] = recipe;
    this.recipes.next(this._recipes.slice());
  }

  // Delete a Recipe
  deleteRecipe(id: string){
    const index = this._recipes.findIndex(recipe => recipe.id == id);
    this._recipes.splice(index,1);
    this.recipes.next(this._recipes.slice());
  }
}
