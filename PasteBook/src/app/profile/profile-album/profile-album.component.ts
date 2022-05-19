import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { IProfileAlbum, IUsers } from '../model/profile';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-album',
  templateUrl: './profile-album.component.html',
  styleUrls: ['./profile-album.component.scss']
})
export class ProfileAlbumComponent implements OnInit {
  user: UserAuth = {};
  albums$!: Observable<IProfileAlbum[]>;
  users: IUsers | any = [];
  route: ActivatedRoute;
  id: any;
  
  constructor(route: ActivatedRoute, private authService: AuthService,
    private profileService: ProfileService,) { 
    this.route = route;
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()!;

    var str = (String(this.route.snapshot.paramMap.get('string'))).match(/\d+/);
    this.id = str? str[0]: 0;
    
    this.profileService.getUserById(Number(this.id)).subscribe(users => {
    this.users = users;
    });

    this.albums$ = this.profileService.getAlbumsByUserId(Number(this.id));
  }

}
