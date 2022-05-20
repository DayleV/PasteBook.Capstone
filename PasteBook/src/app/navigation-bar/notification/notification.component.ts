import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { IUsers } from 'src/app/user/Model/users';
import { INotification } from './Model/notifications';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifs$!: Observable<INotification[]>;
  users$!: Observable<IUsers[]>;
  notifWithUser$!: Observable<any[]> | null;
  loggedInUser: UserAuth = {};
  updateNotification:any;
  isEmpty: boolean = true;
  
  constructor(private notifService: NotificationService) { }

  ngOnInit(): void {
    this.loggedInUser = this.notifService.loggedInUser;
    this.notifs$ = this.notifService.getNotifications(),
    this.users$ = this.notifService.getUsers()

    this.notifWithUser$ = combineLatest([
      this.notifs$,
      this.users$
    ]).pipe(
      map(([notifs, users]) => notifs.map(notifs => ({
        ...notifs,
        friendId: users.find(u => notifs.friendId === u.userId)
      })).filter(n => n.notifReadStatus === false && n.userId === Number(this.loggedInUser.userId)))
    ).pipe(tap(n => n.length>0?this.isEmpty = false: this.isEmpty = true));

    this.updateNotification = setInterval(()=>{
      this.notifWithUser$ = combineLatest([
        this.notifs$,
        this.users$
      ]).pipe(
        map(([notifs, users]) => notifs.map(notifs => ({
          ...notifs,
          friendId: users.find(u => notifs.friendId === u.userId)
        })).filter(n => n.notifReadStatus === false && n.userId === Number(this.loggedInUser.userId)))
      ).pipe(tap(n => n.length>0?this.isEmpty = false: this.isEmpty = true));
    }, 10000);
  }

  clear(){
    this.notifService.clearNotification(this.loggedInUser.userId!).subscribe(
      response => {
        this.notifWithUser$ = null;
        this.isEmpty = true;
      }
    )
  }
}
