import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, Observable, tap } from 'rxjs';
import { DisplayFriendsService } from './display-friends.service';
import { IUser_Friends } from '../profile/model/profile';
import { AuthService } from '../security/auth.service';
import { UserAuth } from '../security/Model/user-auth';
import { IUsers } from '../user/Model/users';

@Component({
  selector: 'app-display-friends',
  templateUrl: './display-friends.component.html',
  styleUrls: ['./display-friends.component.scss']
})
export class DisplayFriendsComponent implements OnInit {

  userFriends$: Observable<any> | undefined;
  users$: Observable<IUsers[]> | undefined;
  friends$: Observable<IUser_Friends[]> | undefined;
  loggedInUser: UserAuth = {};
  search$ = new BehaviorSubject<string>('');

  constructor(private displayFriendsService: DisplayFriendsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser()!;
    this.friends$ = this.displayFriendsService.getFriends(this.loggedInUser.userId!);
    this.users$ = this.displayFriendsService.getUser();

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

}
