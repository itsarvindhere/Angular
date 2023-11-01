import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SelectorListContext } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  url = "https://angular-http-intro-c936e-default-rtdb.firebaseio.com/posts.json";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post(this.url, postData).subscribe({
      next: data => {
        console.log("Post Request Successful", data);
      }
    })
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get(this.url)
    .pipe(map((response: any) =>{
      let list = []
      for(const key in response) {
        list.push({...response[key], id: key})
      }
      return list
    }))
    .subscribe({
      next: data => {
        console.log("Data is ", data)
      }
    })
  }
}
