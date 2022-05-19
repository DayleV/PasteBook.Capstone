import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile/profile.service';
import { AuthService } from '../security/auth.service';
import { UserAuth } from '../security/Model/user-auth';
import { IUsers } from '../user/Model/users';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private profileService: ProfileService) { }

  user: UserAuth = {};
  userDetail!: IUsers;
  searchInput: string = '';

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()!;
    this.profileService.getUserById(this.user.userId).subscribe(
      user => {
        this.userDetail = user
      }
    );
  }

  search(){
    this.router.navigate(['/users'],
    {
      queryParams: {filter: this.searchInput}
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
