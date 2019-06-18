import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TokenInterceptorService } from 'src/app/auth/token-interceptor.service';
import { PostService } from 'src/app/core/services/post.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';
import { PostRoutingModule } from './post-routing.module';
import { PostSingleViewComponent } from './post-single-view/post-single-view.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostResolveService } from './posts-resolver.service';
import { PostsComponent } from './posts/posts.component';
import { AppMaterialModule } from 'src/app/shared/app-material.module';


@NgModule({
  declarations: [
    PostsComponent,
    PostsListComponent,
    PostSingleViewComponent,
    CreateComponent
  ],
  imports: [SharedModule, PostRoutingModule, AppMaterialModule],
  providers: [
    PostService,
    PostResolveService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class PostsModule {}
