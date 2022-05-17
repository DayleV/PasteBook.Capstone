import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/configuration/configuration.service';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
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
  loggedInUser: UserAuth = {};

  constructor(private authService: AuthService,
      private http: HttpClient, 
      private configService: ConfigurationService) {
      this.notifsApiUrl = this.configService.settings.apiUrl + NOTIF_API_ENDPOINT;
      this.usersApiUrl = this.configService.settings.apiUrl + USER_API_ENDPOINT;
      this.loggedInUser = this.authService.getLoggedInUser()!;
     }

  getNotifications(): Observable<INotification[]> {
    return this.http.get<INotification[]>(this.notifsApiUrl);
  }

  getUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.usersApiUrl);
  }

  clearNotification(userId: number): Observable<any> {
    return this.http.put<any>(this.notifsApiUrl+`/${userId}`, userId);
  }

  AddNewNotification(entity: INotification): Observable<INotification> {
    return this.http.post<INotification>(this.notifsApiUrl, entity);
  }

  CreateFriendRequestNotif(userId: number, userFriendId:number){
    let notifResponse: Observable<INotification>;
    let newNotif: INotification = {
      userId: userId,
      userFriendId: userFriendId,
      friendId: this.loggedInUser.userId      
    }

    this.AddNewNotification(newNotif).subscribe(response => response)
  }

  CreatePostNotif(userId: number, postId:number){
    let newNotif: INotification = {
      userId: userId,
      postId: postId,
      friendId: this.loggedInUser.userId      
    }
    this.AddNewNotification(newNotif).subscribe(response => response)
  }

  CreateCommentNotif(userId: number, postId:number, commentId: number){
    let newNotif: INotification = {
      userId: userId,
      postId: postId,
      commentId:commentId,
      friendId: this.loggedInUser.userId      
    }
    this.AddNewNotification(newNotif).subscribe(response => response)
  }

  CreateLikeNotif(userId: number, postId:number, likeId: number){
    let newNotif: INotification = {
      userId: userId,
      postId: postId,
      likeId: likeId,
      friendId: this.loggedInUser.userId      
    }
    this.AddNewNotification(newNotif).subscribe(response => response)
  }
}
