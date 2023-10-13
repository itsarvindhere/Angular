import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}

  userActivated = false;
  activatedSub: Subscription;

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe(data => {
      this.userActivated = data;
    })
  }
  
  ngOnDestroy(): void {
      this.activatedSub.unsubscribe();
  }
}
