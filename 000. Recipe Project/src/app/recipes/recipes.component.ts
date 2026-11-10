import { Component, OnInit } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
    imports: [RecipeListComponent, RouterOutlet]
})
export class RecipesComponent implements OnInit{
  
  ngOnInit() {} 
}
