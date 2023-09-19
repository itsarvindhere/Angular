import { EventEmitter, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  statusUpdated = new EventEmitter<string>();

  constructor(private loggingService: LoggingService) { }

  // Method to fetch the accounts list
  getAccounts() {
    return this.accounts;
  }

  // Method to add a new account
  addAccount(name: string, status: string){
    this.accounts.push({name, status});
  }


  // Method to update status of an account
  updateStatus(id: number, newStatus: string){
    this.accounts[id].status = newStatus;
    this.loggingService.logStatusChange(newStatus);
  }

}
