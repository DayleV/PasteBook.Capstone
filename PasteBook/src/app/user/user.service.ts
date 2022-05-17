import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAlbum, IPost, IUsers } from './Model/users';
import { ConfigurationService } from '../configuration/configuration.service';
import { AuthService } from '../security/auth.service';

const API_ENDPOINT = "users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = "";

  constructor(private http: HttpClient, 
    private configService: ConfigurationService,
    private authService: AuthService) {

      this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;
    }

  users$ = this.http.get<IUsers[]>(this.apiUrl);

  getUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.apiUrl)
    .pipe(
      map(users => users.filter((users: IUsers) => users.userId != this.authService.getLoggedInUser()?.userId))
    );
  }

  //// added to be used for edit profile settings
  getUserToBeUpdated(UserId?:number):Observable<IUsers>{
    return this.http.get<IUsers>(this.apiUrl + `/${UserId}`);
  }

  UpdateUserProfile(UserId?: number, data?: IUsers): Observable<IUsers> {
    return this.http.put<IUsers>(this.apiUrl + `/${UserId}`,data);
  }

}

