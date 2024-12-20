import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  standalone: false
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private accountsService: AccountsService, @Inject('GOOGLE') private API_URL: any, @Inject('FUNC') private func: any, @Inject('CONTENT') private content: string){
    console.log("API URL is " + API_URL.url)
    console.log(func());
    console.log("Content is: " + content);
    
  }


  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);
    this.accountsService.statusUpdated.emit(status);
  }
}
