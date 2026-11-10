import { Component, Input } from '@angular/core';
import { Recipe } from '../../Recipe.model';
import { RecipeService } from '../../recipe.service';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.css'],
    imports: [RouterLinkActive, RouterLink]
})
export class RecipeItemComponent {

  @Input('recipe')
  recipe !: Recipe;

  constructor(private recipeService: RecipeService){}
}
