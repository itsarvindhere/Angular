import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { ReactiveFormsModule } from "@angular/forms";
import {LucideAngularModule, MoveLeft, Save, PlusCircle, Trash2, Pencil, RotateCcw, FilePlus2} from 'lucide-angular';
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { RecipesRoutingModule } from "./recipes-routing.module";

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
        BrowserModule,
        ReactiveFormsModule,
        LucideAngularModule.pick({Save, MoveLeft, PlusCircle, Trash2, Pencil, RotateCcw, FilePlus2}),
        RouterModule,
        RecipesRoutingModule
    ]
})
export class RecipesModule{}