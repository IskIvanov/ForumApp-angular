import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/common/interfaces/post';

@Injectable()
export class PostService {

  api_key = '3e9f450cf34e4475abdd1ef28f15300e';






  constructor(private readonly http: HttpClient) { }


   // GETTING POSTS
  // getAllPosts(): Observable<{ posts: Post[] }> {
  //   return this.http.get<{ posts: Post[] }>('http://localhost:3000/posts');
  // }


//initSources()
  getAllPosts(): Observable<any> {
    return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey=' + this.api_key);
  }


  initArticles() {
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + this.api_key);
  }

  getArticlesByID(source: String) {
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this.api_key);
  }

  // CREATING POSTS

  // createPost(post) {
  //   console.log('createPost in postService called');

  //   return this.http.post<Post>('http://localhost:3000/posts', post);
  // }
}
