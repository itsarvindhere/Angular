import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {

  // Name of the link that is clicked on header
  // By default, we will show the Recipes component on page load
  headerLinkName: any = "recipes";

  onHeaderLinkClick(linkName: String) {
    this.headerLinkName = linkName;
  }
  
}
