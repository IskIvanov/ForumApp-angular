import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from 'src/app/common/interfaces/post';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { PostService } from 'src/app/core/services/post.service';

@Injectable({
  providedIn: 'root'
})
export class PostResolveService implements Resolve<{ posts: Post[] }> {
  constructor(
    private readonly postsService: PostService,
    private readonly notificator: NotificatorService
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.postsService.getAllPosts().pipe(
      catchError(res => {
        this.notificator.error(res.error.error);
        // Alternativle, if the res.error.code === 401, you can logout the user and redirect to /home
        return of({ posts: [] });
      })
    );
  }
}
