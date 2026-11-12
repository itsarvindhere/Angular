import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

// This is how we define a CanActivate Route Guard in Angular 15 and above

export const authGuard : CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot, router: Router = inject(Router), authService: AuthService = inject(AuthService)) => {

  // Use the BehaviorSubject to check if user is logged in
  return authService.user.pipe(
    map(userData => {

      // If user is logged in and has a valid token, activate the route
      if (userData?.token) return true

      // Otherwise, we can navigate the user back to the Login/signup page
      return router.createUrlTree(['/auth'])

    })
  );
  
}