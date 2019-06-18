import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserCardComponent } from './user-card/user-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UsersComponent,
    UserProfileComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class UsersModule { }
