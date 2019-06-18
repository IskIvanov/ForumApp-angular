import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { NotificatorService } from './core/services/notificator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public username = '';
  public isLogged = false;
  private subscription: Subscription;

  constructor(
    private readonly notificator: NotificatorService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  search(searchedTextValue: string) {
    console.log(searchedTextValue);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['posts']);
    this.notificator.success(`Successful logout.`);
  }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(obs_username => {
      if (obs_username === null) {
        this.username = '';
        this.isLogged = false;
      } else {
        this.username = obs_username;
        this.isLogged = true;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
