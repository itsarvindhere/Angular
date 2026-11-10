import { Routes } from '@angular/router';

// ROUTE CONFIGURATION
export const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},

  // Lazy Loading
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.routes').then(m => m.RECIPES_ROUTES), data: {
    preload: true
  }},

  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.routes').then(m => m.SHOPPING_LIST_ROUTES)
  },

  {path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)},
];
