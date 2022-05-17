import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser_Friends } from './Model/user-friends';
import { ConfigurationService } from '../configuration/configuration.service';
import { IUsers } from '../user/Model/users';

const USERS_API_ENDPOINT = "users";
const FRIENDS_API_ENDPOINT = "userfriends";

@Injectable({
  providedIn: 'root'
})
export class UserFriendService {
  userApiUrl: string = "";
  friendsApiUrl: string = "";

  constructor(private http: HttpClient, 
    private configService: ConfigurationService) {
      this.userApiUrl = this.configService.settings.apiUrl + USERS_API_ENDPOINT;
      this.friendsApiUrl = this.configService.settings.apiUrl + FRIENDS_API_ENDPOINT;
    }

    getUser(): Observable<IUsers[]> {  
      return this.http.get<IUsers[]>(this.userApiUrl)  
    } 

    getFriends(id: number): Observable<IUser_Friends[]> {  
      return this.http.get<IUser_Friends[]>(this.friendsApiUrl+'/'+id)
      .pipe(
        map(userFriends => userFriends.filter(userFriends => 
          userFriends.status != false))
      );  
    }
}
