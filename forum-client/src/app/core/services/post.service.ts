import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/common/interfaces/post';

@Injectable()
export class PostService {
  constructor(private readonly http: HttpClient) {}

  getAllPosts(): Observable<{ posts: Post[] }> {
    return this.http.get<{ posts: Post[] }>('http://localhost:3000/posts');
  }

  createPost(post) {
    console.log('createPost in postService called');

    return this.http.post<Post>('http://localhost:3000/posts', post);
  }
}
