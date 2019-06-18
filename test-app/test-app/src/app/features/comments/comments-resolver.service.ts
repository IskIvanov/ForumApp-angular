import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comments } from 'src/app/common/interfaces/comments';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { CommentService } from 'src/app/core/services/comment.service';



@Injectable({
  providedIn: 'root'
})
export class CommentResolveService implements Resolve<{ comments: Comments[] }> {
  constructor(
    private readonly commentService: CommentService,
    private readonly notificator: NotificatorService
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.commentService.getAllComments('0').pipe(
      catchError(res => {
        this.notificator.error(res.error.error);
        // Alternativle, if the res.error.code === 401, you can logout the user and redirect to /home
        return of({ comments: [] });
      })
    );
  }
}
