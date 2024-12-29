import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  standalone: false
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients !: Ingredient[];

  ingredientSub !: Subscription;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSub = this.shoppingListService.ingredients.subscribe(data => {
      this.ingredients = data;
    })
  }

  ngOnDestroy() {
    this.ingredientSub.unsubscribe();
  }

  editIngredient(id: number) {
    this.shoppingListService.ingredientIdForEdit.next(id);
  }

  deleteIngredient(id:number) {
    this.shoppingListService.deleteIngredient(id);
  }
}
