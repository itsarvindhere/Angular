import { Component, OnInit, OnDestroy } from '@angular/core';
import {Post} from '../types';
import { PostsService } from './posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false;
  error = '';

  private errorSub: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();

    this.errorSub = this.postsService.error.subscribe(errorMessage => this.error = errorMessage);
  }

  onCreatePost(post: Post) {
    // Send Http request
    this.postsService.createPost(post);
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
        console.log("Deleted. Data is", data)
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
      error: (e: HttpErrorResponse ) => {
        this.error = "Something went wrong while fetching your posts. Please try again!"
        this.isFetching = false;
      }
    })
  }

  clearError(){
    this.error = '';
  }

  ngOnDestroy(): void {
      this.errorSub.unsubscribe();
  }


}
