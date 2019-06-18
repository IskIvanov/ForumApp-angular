import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentResolveService } from './comments-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: CommentsListComponent,
    pathMatch: 'full',
    resolve: { comments: CommentResolveService }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule {}
