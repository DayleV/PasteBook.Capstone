import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, Observable, tap } from 'rxjs';
import { UserFriendService } from './user-friend.service';
import { IUser_Friends } from './Model/user-friends';
import { AuthService } from '../security/auth.service';
import { UserAuth } from '../security/Model/user-auth';
import { IUsers } from '../user/Model/users';

@Component({
  selector: 'app-user-friend',
  templateUrl: './user-friend.component.html',
  styleUrls: ['./user-friend.component.scss']
})
export class UserFriendComponent implements OnInit {
  userFriends$: Observable<any> | undefined;
  users$: Observable<IUsers[]> | undefined;
  friends$: Observable<IUser_Friends[]> | undefined;
  loggedInUser: UserAuth = {};
  search = '';
  search$ = new BehaviorSubject<string>('');

  constructor(private user_friendService: UserFriendService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser()!;
    this.friends$ = this.user_friendService.getFriends(this.loggedInUser.userId!);
    this.users$ = this.user_friendService.getUser();

    this.userFriends$ = combineLatest([
      this.friends$,
      this.users$,
      this.search$
    ]).pipe(
      map(([friends, users, search]) => friends.map(friends => ({
          ...friends,
          friendId: users.find(u => friends.friendId === u.userId)}))
          .filter((item: any) => item.friendId?.firstName?.includes(search) ||
          item.friendId?.lastName?.includes(search)))
    );
  }
  EmitSearch(){
    this.search$.next(this.search);
  }
}