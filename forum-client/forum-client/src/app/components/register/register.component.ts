import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/common/interfaces/register-user';
import { LoginUser } from 'src/app/common/interfaces/login-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  public register(name: string, email: string, password: string) {
    const regUser: RegisterUser = { name, email, password };
    // console.log(regUser);
    // console.log('inside register.component.ts; outside the authS.reg....');
    this.authService.register(regUser).subscribe(
      (result) => {
        // console.log('inside register.component.ts; in the first part where the registration is');
        const logUser: LoginUser = {email, password};
        this.authService.login(logUser).subscribe(
          response => {
            // console.log(`inside response: ${response}`);
            // console.log('inside register.component.ts; in the second part where the login is');
            this.notificator.success(`Welcome, ${response}`);
            this.router.navigate(['posts']); // todo - navigate to profile page ??
          },
          error => {
            this.notificator.error(error.message);
          }
        );
      },
      error => {
        this.notificator.error(error.message);
      }
    );

  }
}
