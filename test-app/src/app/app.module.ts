import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { CoreModule } from './core/core.module';
import { UsersModule } from './features/users/users.module';
import { SharedModule } from './shared/shared.module';
import { AppMaterialModule } from './shared/app-material.module';

import { PostSingleViewComponent } from './features/posts/post-single-view/post-single-view.component';
import { PostService } from 'src/app/core/services/post.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    NavbarComponent,
    PostSingleViewComponent
    
  ],
  imports: [
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    UsersModule,
    AppMaterialModule

  ],
  providers: [
    PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
