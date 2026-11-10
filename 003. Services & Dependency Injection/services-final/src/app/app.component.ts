import { Component, OnInit, inject} from '@angular/core';
import { AccountsService } from './accounts.service';
import { Account } from './account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  accounts: Account[] = [];
  accountsService: AccountsService = inject(AccountsService);
  // constructor(private accountsService: AccountsService){}

  ngOnInit() {
    this.accounts = this.accountsService.getAccounts();
  }
}
