import { Component, OnInit, inject, viewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/Ingredient.model';
import { LucideFilePlus, LucideRotateCcw } from '@lucide/angular';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
    imports: [ReactiveFormsModule, FormsModule, LucideFilePlus, LucideRotateCcw]
})
export class ShoppingEditComponent implements OnInit {
  private shoppingListService = inject(ShoppingListService);


  
  readonly editForm = viewChild.required<NgForm>('editForm');

  // Subscription for ingredientId for Edit Flow
  editSub !: Subscription;

  // Flag to check if we are editing an existing ingredient
  editFlow = false;

  // Id of the ingredient that is being edited
  editFlowId !: number;


  ngOnInit() {
    this.editSub = this.shoppingListService.ingredientIdForEdit.subscribe({
      next: (id: number) => {
      const ingredient: Ingredient = this.shoppingListService.getIngredient(id);

      this.editFlow = true;
      this.editFlowId = id;

      this.editForm().form.patchValue({
        name: ingredient.name,
        amount: ingredient.amount
      });
    }})
  }

  onAddClick() {
    
      const name = this.editForm().value.name;
      const amount = this.editForm().value.amount;

      // If it is an edit Flow, update the existing ingredient
      if (this.editFlow) {
        this.shoppingListService.editIngredient(this.editFlowId,new Ingredient(name, amount));
      } 
      // Otherwise, add this new ingredient
      else {
        this.shoppingListService.addIngredient(new Ingredient(name, amount));
      }

      // Clear the Form
      this.clearForm();
      
  }

  // Clear the form
  clearForm() {
    // Switch the Edit Mode flag to false
    this.editFlow = false;

    // Reset the form
    this.editForm().reset();
  }
}
