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

  constructor(route: ActivatedRoute, private profileService: ProfileService, 
    private authService: AuthService, private router: Router) {
    this.route = route;
    this.isEdit = false;
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()!;

    var str = (String(this.route.snapshot.paramMap.get('string'))).match(/\d+/);
    this.id = str? str[0]: 0;
    
    this.profileService.getUserById(Number(this.id)).subscribe(users => {
    this.users = users;
    });
  }

  editBlurb(): void {
    this.isEdit = true;
    this.ngOnInit();
  }

  saveBlurb(id: number | undefined){
    this.profileService.updateProfile(id, this.users).subscribe(user => this.users == user);
    this.isEdit = false;
    this.router.navigate([`users/${this.users.firstName! + this.users.lastName! + this.users.userId}`]);
    this.ngOnInit();
  }

  cancelBlurb(): void {
    this.isEdit = false;
    this.ngOnInit();
  }

}