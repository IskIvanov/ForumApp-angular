import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { LoginUser } from 'src/app/common/interfaces/login-user';
import { RegisterUser } from 'src/app/common/interfaces/register-user';
import { JwtService } from './jwt.service';
import { TokenUser } from 'src/app/common/interfaces/token-user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly userSubject$ = new BehaviorSubject<string | null>(this.username);

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
    private readonly jwt: JwtService,
  ) { }

  public get user$() {
    return this.userSubject$.asObservable();
  }

  private get username(): string | null {
    const token = this.storage.get('token');
    const username = this.storage.get('username') || '';
    if (token) {
      return username;
    }
    return null;
  }

  public login(user: LoginUser): Observable<any> {
    return this.http.post('http://localhost:3000/login', user)
    .pipe(
      tap( (response: any) => {
        const infoForUserFromToken: TokenUser = this.jwt.decode(response.token);
        // console.log(`Teeestiing user ID: ${infoForUserFromToken.id}`);
        const loggedUserID = infoForUserFromToken.id;
        const loggedUserUsername = infoForUserFromToken.name;
        const loggedUserRoles = infoForUserFromToken.roles;
        this.userSubject$.next(loggedUserUsername);
        this.storage.set('token', response.token);
        this.storage.set('username', loggedUserUsername);
        this.storage.set('userID', loggedUserID);
      }),
      map(
        response => {
          return this.storage.get('username');
        }
      ),
      // catchError( // todo in the resolvers
    );
  }

  public logout(): void {
    this.userSubject$.next(null);
    this.storage.remove('token');
    this.storage.remove('username');
  }

  public register(user: RegisterUser): Observable<any> {
    // console.log(user);
    // console.log('inside auth.service.ts');
    return this.http.post('http://localhost:3000/register', user);
  }

}
