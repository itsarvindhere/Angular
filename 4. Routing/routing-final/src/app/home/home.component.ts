import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.loginStatus.subscribe(data => {
      this.isLoggedIn = data;
    })
  }

  onLoadServers() {
    // Imagine we do some calculation first
    console.log("Alright we are navigating to the servers route");

    // Now we want to navigate to a different route
    // Here we are using absolute path
    // So, it will attach 'servers' to the root URL localhost:4200
    this.router.navigate(['/servers'])
  } 

  onLoadServer1(id: number) {
    this.router.navigate(['/servers', id, 'edit'], {
      queryParams: {allowEdit: '1'},
      fragment: 'serverName'
    })
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

}
