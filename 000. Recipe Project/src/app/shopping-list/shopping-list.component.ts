import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { LucidePencil, LucideTrash } from '@lucide/angular';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
    imports: [ShoppingEditComponent, LucidePencil, LucideTrash]
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  private shoppingListService = inject(ShoppingListService);


  ingredients !: Ingredient[];

  ingredientSub !: Subscription;

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSub = this.shoppingListService.ingredients.subscribe(data => {
      this.ingredients = data;
    });
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
