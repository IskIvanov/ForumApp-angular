import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Comments } from 'src/app/common/interfaces/comments';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
  ) { }

  getAllComments(postId: string): Observable<{ comments: Comments[] }> {
    return this.http.get<{ comments: Comments[] }>(`http://localhost:3000/posts/${postId}/comments`);
  }

/*   public register(user: RegisterUser): Observable<any> {
    // console.log(user);
    // console.log('inside auth.service.ts');
    return this.http.post('http://localhost:3000/register', user);
  } */

}
