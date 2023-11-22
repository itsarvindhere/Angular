import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadSpecificModulesService } from './preload-specific-modules.service';

// ROUTE CONFIGURATION
const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},

  // Lazy Loading
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule), data: {
    preload: true
  }},

  {path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},

  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadSpecificModulesService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
