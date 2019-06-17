import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/common/interfaces/login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  triggerLogin(email: string, password: string) {
    const logUser: LoginUser = { email, password };
    // console.log(logUser);
    this.authService.login(logUser).subscribe(
      result => {
        // console.log('inside next in login.component.ts');
        // console.log(result);
        this.router.navigate(['posts']);
        this.notificator.success(`Welcome, ${result}!`);
      },
      error => {
        // console.log('inside error in login.component.ts');
        this.notificator.error(error.message);
      }
    );
  }

}
