import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  url = "https://angular-http-intro-c936e-default-rtdb.firebaseio.com/posts.json";

  constructor(private http: HttpClient) { }

  // Create a new Post
  createPost(post : Post) {
    return this.http.post<{name: string}>(this.url, post);
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
