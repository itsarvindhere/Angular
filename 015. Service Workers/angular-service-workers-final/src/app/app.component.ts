import { Component, computed, OnInit } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';

import { Post } from './post.model';
import { PostComponent } from './post/post.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [PostComponent]
})
export class AppComponent {
  postsResource = httpResource<Post[]>(() => 'https://jsonplaceholder.typicode.com/posts');

  posts = computed(() => {
    if (this.postsResource.hasValue()){
      return this.postsResource.value();
    }
    return undefined;
  });
}
