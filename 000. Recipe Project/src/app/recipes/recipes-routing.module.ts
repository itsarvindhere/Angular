import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { recipesResolver } from "./recipes-resolver";
import { authGuard } from "../auth/auth.guard";


// Routes Configuration
const routes: Routes = 
    [
    {path: '', component: RecipesComponent, title: "Recipes", children: [
        {path: '', component: RecipeStartComponent, title: "Recipes"},
        {path: 'new', component: RecipeEditComponent, title: "Add New Recipe"},
        {path: ':id/edit', component: RecipeEditComponent, title: "Edit Recipe"},
        {path: ':id', component: RecipeDetailComponent, title: "Recipe Details"},
    ], resolve: [recipesResolver], canActivate: [authGuard]},]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule{}