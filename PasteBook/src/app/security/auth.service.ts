import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';
import { Login } from '../login/Model/login';
import { UserAuth } from './Model/user-auth';
import { UserAuthBase } from './Model/user-auth-base';

const API_ENDPOINT = "login";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = "";

  constructor(private http: HttpClient, 
    private configService: ConfigurationService) { 
      this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;
      console.log(this.apiUrl);
    }

  login(login: Login): Observable<UserAuthBase>{
    return this.http.post<UserAuthBase>(this.apiUrl, login, httpOptions);
  }
}
