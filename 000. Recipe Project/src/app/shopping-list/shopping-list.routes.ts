import { Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

// Route Configuration
export const SHOPPING_LIST_ROUTES : Routes = [
    {path: '', component: ShoppingListComponent, title: "Shopping List"},
]