import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { UserAuth } from '../security/Model/user-auth';
import { IUsers } from '../profile/model/profile';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  loggedInUser: UserAuth = {};
  user: IUsers = {};
  constructor(private authService: AuthService, private profileService: ProfileService, ){}
  
  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser()!;
    this.profileService.getUserById(Number(this.loggedInUser.userId)).subscribe(users => {
      this.user = users;
    });
  }

}
