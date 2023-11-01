import { Component, OnInit } from '@angular/core';
import {Post} from '../types';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(post: Post) {
    // Send Http request
    this.postsService.createPost(post).subscribe({
      next: data => {
        this.fetchPosts();
      }
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe({
      next: data => {
        this.loadedPosts = [];
      }
    });
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts()
    .subscribe({
      next: (posts) => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      error: e => {
        this.isFetching = false;
      }
    })
  }
}
