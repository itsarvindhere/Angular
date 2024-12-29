import { Component, Input } from '@angular/core';
import { Recipe } from '../../Recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.css'],
    standalone: false
})
export class RecipeItemComponent {

  @Input('recipe')
  recipe !: Recipe;

  constructor(private recipeService: RecipeService){}
}
