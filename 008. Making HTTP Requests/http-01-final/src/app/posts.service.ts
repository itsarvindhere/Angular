import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  error = new Subject<string>();

  url = "https://angular-http-intro-c936e-default-rtdb.firebaseio.com/posts.json";

  constructor(private http: HttpClient) { }

  // Create a new Post
  createPost(post : Post) {
    this.http.post<{name: string}>(this.url, post).subscribe({
      next: data => {
        console.log("Post Created", data)
      },
      error: e => {
        this.error.next("Couldn't Create a new Post. Please Try Again.");
      }
    });;
  }

  // Fetch Posts
  fetchPosts(){
    return this.http.get<{[key: string]: Post}>(this.url)
    .pipe(map((response) =>{
      let list: Post[] = []
      for(const key in response) {
        list.push({...response[key], id: key})
      }
      return list
    }));
  }

  // Delete Posts
  deletePosts(){
    return this.http.delete(this.url);
  }
}
