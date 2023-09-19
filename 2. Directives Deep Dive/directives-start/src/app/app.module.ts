import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BasicHighlightDirective } from './basic-highlight.directive';
import { NgNotIfDirective } from './ng-not-if.directive';

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective,
    NgNotIfDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
