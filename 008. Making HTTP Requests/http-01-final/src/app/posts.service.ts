import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
    this.http.post<{name: string}>(this.url, post, {
      observe: 'response'
    }).subscribe({
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
    return this.http.get<{[key: string]: Post}>(this.url, {
      headers: new HttpHeaders({
        "Some-Header": "Some Value"
      }),
      params: new HttpParams().set('print', 'pretty')
    })
    .pipe(map((response) =>{
      let list: Post[] = []
      for(const key in response) {
        list.push({...response[key], id: key})
      }
      return list
    }),
    catchError(error => {
      // Do something.. Maybe log the error somewhere
      return throwError(error);
    })
    );
  }

  // Delete Posts
  deletePosts(){
    return this.http.delete(this.url, {
      observe: "events"
    }).pipe(tap(event => {
      if(event.type === HttpEventType.Sent) {
        console.log("Request Sent")
      }

      if(event.type === HttpEventType.Response) {
        console.log("Response Received")
      }
    }))
  }
}
