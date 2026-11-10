import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    imports: [RouterLink, RouterLinkActive]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private dataStorageService = inject(DataStorageService);
  private authService = inject(AuthService);


  // Flag to indicate if user is logged in
  isLoggedIn = false;

  // Subscription
  private userSub !: Subscription;

  ngOnInit(): void {
      this.userSub = this.authService.user.subscribe({
        next: data => {
          if (data?.token) this.isLoggedIn = true;
        }
      })
  }

  onSaveClick() {
    this.dataStorageService.storeRecipes();
  }
  onFetchClick() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
}
