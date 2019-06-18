import { NgModule } from '@angular/core';
import { CommentsComponent } from './comments/comments.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';
import { CommentsRoutingModule } from './comments-routing';
import { CommentService } from 'src/app/core/services/comment.service';
import { CommentResolveService } from './comments-resolver.service';
import { CommentsSingleViewComponent } from './comments-single-view/comments-single-view.component';

@NgModule({
  declarations: [
    CommentsComponent,
    CommentsListComponent,
    CommentsSingleViewComponent
  ],
  imports: [
    SharedModule, 
    CommentsRoutingModule
  ],
  providers: [
    CommentService,
    CommentResolveService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class CommentsModule { }
