import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  activeUsers = [];
  inactiveUsers = [];
  activeOperationCount = 0;
  inactiveOperationCount = 0;

  constructor(private usersService: UsersService, private counterService: CounterService){}

  ngOnInit() {
    this.activeUsers = this.usersService.getActiveUsers();
    this.inactiveUsers = this.usersService.getInactiveUsers();
    this.counterService.setToActiveClicked.subscribe(data => {
      this.activeOperationCount = data;
    })

    this.counterService.setToInactiveClicked.subscribe(data => {
      this.inactiveOperationCount = data;
    })
  }

}
