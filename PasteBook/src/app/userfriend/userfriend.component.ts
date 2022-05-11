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

  userfriends: IUserFriends[] = [];
  userfriends$: Observable<IUserFriends[]> | undefined;

  constructor(private userfriendService: UserfriendService) { }

  ngOnInit(): void {
    this.userfriendService.getUserFriends().subscribe({
      next: userfriends => this.userfriends = userfriends
    });

    this.userfriends$ = this.userfriendService.getUserFriends();
  }

}
