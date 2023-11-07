import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  
  @ViewChild('editForm')
  editForm !: NgForm;

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

      this.editForm.form.patchValue({
        name: ingredient.name,
        amount: ingredient.amount
      });
    }})
  }

  constructor(private shoppingListService: ShoppingListService){}

  onAddClick() {
    
      const name = this.editForm.value.name;
      const amount = this.editForm.value.amount;

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
    this.editForm.reset();
  }
}
