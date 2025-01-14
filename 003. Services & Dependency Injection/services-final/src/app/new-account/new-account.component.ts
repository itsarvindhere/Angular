import { Component, EventEmitter, Inject, OnInit, Output, inject } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';
import { LOGGING_SERVICE_TOKEN } from '../tokens';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  standalone: false
})
export class NewAccountComponent implements OnInit {
  constructor(@Inject(LOGGING_SERVICE_TOKEN) private loggingService: LoggingService, private accountsService: AccountsService ){}

  ngOnInit(): void {
    this.accountsService.statusUpdated.subscribe(data => {
      alert("New Status -> " + data);
    })
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus)
    // console.log('A server status changed, new status: ' + accountStatus);
    this.loggingService.logStatusChange(accountStatus);
  }
}
