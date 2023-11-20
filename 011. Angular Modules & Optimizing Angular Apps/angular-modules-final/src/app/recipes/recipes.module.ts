import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        RecipesComponent, 
        RecipeListComponent, 
        RecipeEditComponent, 
        RecipeDetailComponent, 
        RecipeItemComponent, 
        RecipeStartComponent
    ],
    
    imports: [
        ReactiveFormsModule,
        RouterModule,
        RecipesRoutingModule,
        SharedModule
    ]
})
export class RecipesModule{}