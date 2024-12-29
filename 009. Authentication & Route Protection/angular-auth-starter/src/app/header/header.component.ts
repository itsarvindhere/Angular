import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService){}

  onSaveClick() {
    this.dataStorageService.storeRecipes();
  }
  onFetchClick() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
