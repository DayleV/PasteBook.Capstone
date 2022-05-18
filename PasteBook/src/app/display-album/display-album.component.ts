import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { AuthService } from '../security/auth.service';
import { UserAuth } from '../security/Model/user-auth';
import { IProfileAlbum, IUsers } from '../profile/model/profile';
import { DisplayAlbumService } from './display-album.service';

@Component({
  selector: 'app-display-album',
  templateUrl: './display-album.component.html',
  styleUrls: ['./display-album.component.scss']
})
export class DisplayAlbumComponent implements OnInit {

  user: UserAuth = {};
  albums$!: Observable<IProfileAlbum[]>;
  users: IUsers | any = [];
  route: ActivatedRoute;
  checker: boolean = true;
  error: boolean = false;

  constructor(route: ActivatedRoute, private router: Router, private displayAlbumService: DisplayAlbumService, private authService: AuthService) {
    this.route = route;
   }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()!;

    let str = (String(this.route.snapshot.paramMap.get('string'))).match(/\d+/);
    let id = str? str[0]: 0;

    this.displayAlbumService.getUserById(Number(id)).pipe(
      catchError(err => {
        if(Number(err.status) === 404){
          this.error = true;
        }
        return EMPTY
      })
    ).subscribe(users => {
    this.users = users;
    });

    if(id != this.user.userId){
      this.checker = false;
    }

    this.albums$ = this.displayAlbumService.getAlbumsByUserId(Number(id));
    
  }

}
