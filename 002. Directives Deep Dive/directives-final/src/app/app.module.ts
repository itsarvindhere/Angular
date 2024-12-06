import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BasicHighlightDirective } from './basic-highlight.directive';
import { NgNotIfDirective } from './ng-not-if.directive';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { LogDirective } from './log.directive';

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective,
    NgNotIfDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ParagraphComponent,
    LogDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
