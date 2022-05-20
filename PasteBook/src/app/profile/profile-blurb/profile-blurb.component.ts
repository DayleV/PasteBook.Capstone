import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { IUsers } from '../model/profile';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-blurb',
  templateUrl: './profile-blurb.component.html',
  styleUrls: ['./profile-blurb.component.scss']
})
export class ProfileBlurbComponent implements OnInit {
  user: UserAuth = {};
  users: IUsers | any = [];
  route: ActivatedRoute;
  id: any;
  isEdit: boolean;
  userName!: string;

  constructor(route: ActivatedRoute, private profileService: ProfileService, 
    private authService: AuthService, private router: Router) {
    this.route = route;
    this.isEdit = false;
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()!;

    this.route.paramMap.subscribe(
      params => {
        params.get('string')? this.userName = params.get('string')! : '';
        this.profileService.getUserByUserName(this.userName).subscribe(users => {
          this.users = users;
          });
        }
    );

    
  }

  editBlurb(): void {
    this.isEdit = true;
    this.ngOnInit();
  }

  saveBlurb(id: number | undefined){
    this.profileService.updateProfile(id, this.users[0]).subscribe(user => {this.users[0] == user
      this.isEdit = false;
      this.router.navigate([`users/${this.users[0]?.userName}`]);
      this.ngOnInit();});
  }

  cancelBlurb(): void {
    this.isEdit = false;
    this.ngOnInit();
  }

}
