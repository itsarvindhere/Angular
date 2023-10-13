import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  isActivated = false;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe({
      next: params => {
        this.id = +params.id;
      }
    });
  }

  onActivateClick() {
    this.isActivated = !this.isActivated;
    this.userService.activatedEmitter.next(this.isActivated);
  }
}
