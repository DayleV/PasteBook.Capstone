import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { UserFriendService } from 'src/app/user-friend/user-friend.service';
import { IUsers, IUser_Friends } from '../model/profile';

@Component({
  selector: 'app-profile-friend',
  templateUrl: './profile-friend.component.html',
  styleUrls: ['./profile-friend.component.scss']
})
export class ProfileFriendComponent implements OnInit {
  userFriends$: Observable<any> | undefined;
  users$: Observable<IUsers[]> | undefined;
  friends$: Observable<IUser_Friends[]> | undefined;
  loggedInUser: UserAuth = {};
  search$ = new BehaviorSubject<string>('');
  id: any;
  route: ActivatedRoute;

  constructor(private user_friendService: UserFriendService, private authService: AuthService,
    route: ActivatedRoute) {
      this.route = route;
     }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser()!;

    var str = (String(this.route.snapshot.paramMap.get('string'))).match(/\d+/);
    this.id = str? str[0]: 0;
    

    this.friends$ = this.user_friendService.getFriends(this.id);
    this.users$ = this.user_friendService.getUser();

    this.userFriends$ = combineLatest([
      this.friends$,
      this.users$
    ]).pipe(
      map(([friends, users]) => friends.map(friends => ({
          ...friends,
          friendId: users.find(u => friends.friendId === u.userId)}))
    ));
  }

}
