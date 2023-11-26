import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients !: Ingredient[];

  ingredientSub !: Subscription;

  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService){}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSub = this.shoppingListService.ingredients.subscribe(data => {
      this.ingredients = data;
    });

    this.loggingService.printLog("Hello from ShoppingListComponent ngOnInit");
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
