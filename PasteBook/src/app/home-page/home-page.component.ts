import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileService } from '../profile/profile.service';
import { AuthService } from '../security/auth.service';
import { UserAuth } from '../security/Model/user-auth';
import { IUsers } from '../user/Model/users';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private authService: AuthService, private profileService: ProfileService) { }
  user: UserAuth = {};
  userDetail!: IUsers;
  
  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()!;
    this.profileService.getUserById(this.user.userId).subscribe(
      user => {
        this.userDetail = user
      }
    );
  }

}
