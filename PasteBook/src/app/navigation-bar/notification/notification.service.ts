import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/configuration/configuration.service';
import { IUsers } from 'src/app/user/Model/users';
import { INotification } from './Model/notifications';

const NOTIF_API_ENDPOINT = "notifications";
const USER_API_ENDPOINT = "users";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifsApiUrl: string = "";  
  usersApiUrl: string = ""; 

  constructor(private http: HttpClient, 
    private configService: ConfigurationService) {
      this.notifsApiUrl = this.configService.settings.apiUrl + NOTIF_API_ENDPOINT;
      this.usersApiUrl = this.configService.settings.apiUrl + USER_API_ENDPOINT;
     }

  getNotifications(): Observable<INotification[]> {
    return this.http.get<INotification[]>(this.notifsApiUrl);
  }

  getUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.usersApiUrl);
  }
  
}
