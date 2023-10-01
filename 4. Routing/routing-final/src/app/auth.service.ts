import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;

  loginStatus = new EventEmitter();

  constructor() { }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800)
    });

    return promise;
  }

  login() {
    this.loggedIn = true;
    this.loginStatus.emit(this.loggedIn);
  }

  logout() {
    this.loggedIn = false;
    this.loginStatus.emit(this.loggedIn);
  }
}
