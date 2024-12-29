import { Component, Input } from '@angular/core';
import { Recipe } from '../Recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css'],
    standalone: false
})
export class RecipeDetailComponent {

  recipe !: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recipe = this.recipeService.getRecipe(params['id']);
    })
    
  }


  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.router.navigate(['/shopping-list']);
  }

  // Delete a Recipe
  deleteRecipe(id: string){
    this.recipeService.deleteRecipe(id);
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
