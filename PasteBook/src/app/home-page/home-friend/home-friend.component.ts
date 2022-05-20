import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, } from 'rxjs';
import { UserFriendService } from 'src/app/user-friend/user-friend.service';
import { IUser_Friends } from 'src/app/user-friend/Model/user-friends';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { IUsers } from 'src/app/user/Model/users';

@Component({
  selector: 'app-home-friend',
  templateUrl: './home-friend.component.html',
  styleUrls: ['./home-friend.component.scss']
})
export class HomeFriendComponent implements OnInit {
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
          .filter((item: any) => item.friendId?.firstName?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          item.friendId?.lastName?.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
    );
  }
}
