import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../Recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css'],
    standalone: false
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];

  recipeSub !: Subscription;

  constructor(private recipeService: RecipeService){}

  ngOnInit() {
    this.recipeSub = this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
    });
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }
}
