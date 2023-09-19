import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private activeUsers = ['Max', 'Anna'];
  private inactiveUsers = ['Chris', 'Manu'];

  constructor() { }

  // Get active users
  getActiveUsers() {
    return this.activeUsers;
  }

  // Get inactive users
  getInactiveUsers() {
    return this.inactiveUsers;
  }

  // Set a user to inactive
  setToInactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
  }

  // Set a user to Active
  setToActive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
  }

}
