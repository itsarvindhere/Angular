import {Injectable } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredients = new Subject<Ingredient[]>();
  ingredientIdForEdit = new Subject<number>();

  private _ingredients: Ingredient[] = [
    new Ingredient("Onion", 6),
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 4)
  ];

  getIngredients() : Ingredient[] {
    return this._ingredients.slice();
  }

  getIngredient(id: number): Ingredient {
    return this._ingredients[id];
  }

  // Delete an ingredient
  deleteIngredient(id: number){
    this._ingredients.splice(id,1)
    this.ingredients.next(this._ingredients.slice());
  }

  // Add a single ingredient using input fields on shopping list page
  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredients.next(this._ingredients.slice());
  }

  // Add a list of ingredients from Recipe Detail page to shopping list
  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredients.next(this._ingredients.slice());
  }

  // Edit an existing Ingredient
  editIngredient(id: number, ingredient: Ingredient) {
    this._ingredients[id] = ingredient;
    this.ingredients.next(this._ingredients.slice());
  }
}
