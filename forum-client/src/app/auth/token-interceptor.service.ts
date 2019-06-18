import {
  HttpClient,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private userSubscription: Subscription;
  constructor(
    private readonly storage: StorageService,
    private readonly http: HttpClient
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // getting the user from the db

    // console.log(request);
    // const userID: string = this.storage.get('userID');
    // const user: Observable<any> = this.http.get<{ user: any }>(
    //   `http://localhost:3000/user/${userID}`
    // );
    // this.userSubscription = user.subscribe(data => {
    //   console.log(data);
    // });

    // actual interceptor

    const token = this.storage.get('token') || '';
    const updatedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log(updatedRequest);

    return next.handle(updatedRequest);
  }
}
