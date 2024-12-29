import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService){}

  ngOnInit() {
    // Auto Login Functionality
    this.authService.autoLogin();

  }
  
}
