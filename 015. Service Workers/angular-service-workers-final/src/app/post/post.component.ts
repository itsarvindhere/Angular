import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
    standalone: false
})
export class PostComponent {
  @Input() title !: string;
  @Input() content !: string;
}
