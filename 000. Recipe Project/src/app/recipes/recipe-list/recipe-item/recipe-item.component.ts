import { Component, input } from '@angular/core';
import { Recipe } from '../../Recipe.model';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.css'],
    imports: [RouterLinkActive, RouterLink]
})
export class RecipeItemComponent {
  readonly recipe = input.required<Recipe>();
}
