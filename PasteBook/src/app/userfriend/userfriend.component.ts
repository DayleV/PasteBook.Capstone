import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUserFriends } from './Model/userfriends';
import { UserfriendService } from './userfriend.service';

@Component({
  selector: 'app-userfriend',
  templateUrl: './userfriend.component.html',
  styleUrls: ['./userfriend.component.scss']
})
export class UserfriendComponent implements OnInit {
  
  userfriend: IUserFriends = {
    UserId: 1,
    FriendId: 3,
    Status: true,
  };

  userfriends$: Observable<IUserFriends[]> | undefined;

  constructor(private userfriendService: UserfriendService) { }


  ngOnInit(): void {
    this.userfriends$ = this.userfriendService.getUserFriends();
  }

  addNewUserFriend() {
    // this.userfriendService.addFriend(this.userfriend);
    // console.log(this.userfriend);
    this.userfriendService.addFriend(this.userfriend).subscribe(userfriend => this.userfriend = userfriend);
    console.log("Success!");
  }

}
