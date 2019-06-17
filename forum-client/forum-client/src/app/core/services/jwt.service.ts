import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenUser } from 'src/app/common/interfaces/token-user';

@Injectable({
providedIn: 'root'
})

export class JwtService {
    private decodedToken = '';
    private expirationDate: Date;
    private isExpired = false;
    public user: TokenUser;

    constructor() {}

    private readonly jwt = new JwtHelperService();

    decode(myRawToken: string): TokenUser {
        this.decodedToken = this.jwt.decodeToken(myRawToken);
        // this.user = JSON.stringify(this.decodedToken);
        return this.user = this.jwt.decodeToken(myRawToken);
    }

    getExpirationDate(myRawToken: string): Date {
        return this.expirationDate = this.jwt.getTokenExpirationDate(myRawToken);
    }

    isTokenExpired(myRawToken: string): boolean {
        return this.isExpired = this.jwt.isTokenExpired(myRawToken);
    }
}
