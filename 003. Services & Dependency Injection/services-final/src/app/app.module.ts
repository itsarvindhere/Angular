import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { LoggingService } from './logging.service';
import { LOGGING_SERVICE_TOKEN } from './tokens';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    {
      provide: LOGGING_SERVICE_TOKEN, 
      useClass: LoggingService
    },

    {
      provide: 'GOOGLE', 
      useValue: Object.freeze({
        websiteName: "Google",
        url: "https://www.google.com/"
      })
    },

    {
      provide: 'FUNC', 
      useValue: () => "I am a function"
    },

    {
      provide: 'VAL', 
      useValue: 1
    },

    {
      provide: 'CONTENT', 
      useFactory: (value) => {
        if(value < 0) return "I am negative"
        return "I am positive"
      },
      deps: ['VAL']
    }

],
  bootstrap: [AppComponent]
})
export class AppModule { }
