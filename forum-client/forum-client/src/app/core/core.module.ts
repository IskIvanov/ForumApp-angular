import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage.service';
import { ToastrModule } from 'ngx-toastr';
import { NotificatorService } from './services/notificator.service';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    StorageService,
    NotificatorService,
    AuthService,
    JwtService,
  ],
})
export class CoreModule { }
