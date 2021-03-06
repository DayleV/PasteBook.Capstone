import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';
import { Login } from '../login/Model/login';
import { token } from './Model/token';
import { UserAuth } from './Model/user-auth';
import { UserAuthBase } from './Model/user-auth-base';

const API_ENDPOINT = "login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = "";
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, 
    private configService: ConfigurationService,
    private jwtHelper: JwtHelperService) { 
      this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;
    }

  login(login: Login): Observable<UserAuthBase>{
    return this.http.post<UserAuthBase>(this.apiUrl, login)
    .pipe(
      tap(response => response.token? this.setSession(response.token): null)
    );
  }

  public setSession(token: string) {
    if(token){
      localStorage.setItem('token', JSON.stringify(token));
      this.isLoggedIn$.next(true);
    }
  }

  private GetTokenDecode(token: string): token{
    let tokenObject: token = {};
    let decodedToken = this.jwtHelper.decodeToken(token);
    tokenObject.tokenPayload = decodedToken;
    tokenObject.expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    return tokenObject;
  }

  logout(): void{
    localStorage.removeItem("token");
    this.isLoggedIn$.next(false);
  }

  getLoggedInUser(): UserAuth | null {
    if(this.isLoggedIn()){
      let token = localStorage.getItem("token");     
      let decodedToken = this.GetTokenDecode(token!);
      let user: UserAuth = {
        token: token!,
        userId: decodedToken.tokenPayload.UserId,
        firstName: decodedToken.tokenPayload.FirstName,
        lastName: decodedToken.tokenPayload.LastName,
        userName: decodedToken.tokenPayload.UserName,
        profilePicture: decodedToken.tokenPayload.ProfilePicture
      };
      return user;
    }
    return null;
  }

  public isLoggedIn(): boolean {    
    let token = localStorage.getItem("token");
    if(token)
      return !this.jwtHelper.isTokenExpired(token);
    return false;
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }
}
