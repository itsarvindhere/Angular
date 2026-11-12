import { Component, input, Input } from '@angular/core';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent {
  title = input.required<string>();
  content = input.required<string>();
}
