import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
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
  error: boolean = false;
  userName!: string;
  
  constructor(route: ActivatedRoute, private authService: AuthService,
    private profileService: ProfileService,) { 
    this.route = route;
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()!;

    this.route.paramMap.subscribe(
      params => {
        params.get('string')? this.userName = params.get('string')! : '';
        this.profileService.getUserByUserName(this.userName).subscribe(users => {
          this.users = users;
          this.albums$ = this.profileService.getAlbumsByUserId(this.users[0].userId);
          });
        }
    );

   

    // this.profileService.getUserById(Number(this.id)).pipe(
    //   catchError(err => {
    //     if(Number(err.status) === 404){
    //       this.error = true;
    //     }
    //     return EMPTY
    //   })
    // ).subscribe(users => {
    // this.users = users;
    // });


  }

}
