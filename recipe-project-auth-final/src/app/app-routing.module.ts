import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { recipesResolver } from './recipes/recipes-resolver';
import { AuthComponent } from './auth/auth/auth.component';

// ROUTE CONFIGURATION
const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, title: "Recipes", children: [
    {path: '', component: RecipeStartComponent, title: "Recipes"},
    {path: 'new', component: RecipeEditComponent, title: "Add New Recipe"},
    {path: ':id', component: RecipeDetailComponent, title: "Recipe Details"},
    {path: ':id/edit', component: RecipeEditComponent, title: "Edit Recipe"}
  ], resolve: [recipesResolver]},
  {path: 'shopping-list', component: ShoppingListComponent, title: "Shopping List"},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
