import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {

  // Flag to indicate if user is logged in
  isLoggedIn = false;

  // Subscription
  private userSub !: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

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
