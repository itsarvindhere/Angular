import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./Recipe.model";
import { inject } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

export const recipesResolver : ResolveFn<Recipe[]> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, dataStorageService: DataStorageService = inject(DataStorageService)) => {
    return dataStorageService.fetchRecipes();
}