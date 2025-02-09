import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ForbiddenNameDirective } from './forbidden-name.directive';
import { CrossFieldValidatorDirective } from './cross-field-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenNameDirective,
    CrossFieldValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
