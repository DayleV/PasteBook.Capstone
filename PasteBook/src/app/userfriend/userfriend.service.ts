import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserFriends } from './Model/userfriends';
import { ConfigurationService } from '../configuration/configuration.service';

const API_ENDPOINT = "userfriends";

@Injectable({
  providedIn: 'root'
})
export class UserfriendService {
  apiUrl: string = "";

  
  constructor(private http: HttpClient, private configService: ConfigurationService) {
      this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;
      console.log(this.apiUrl);
    }

  getUserFriends(): Observable<IUserFriends[]> {
    return this.http.get<IUserFriends[]>(this.apiUrl);
  }

  addFriend(entity: IUserFriends): Observable<IUserFriends> {
  return this.http.post<IUserFriends>(this.apiUrl, entity);
  }


}
