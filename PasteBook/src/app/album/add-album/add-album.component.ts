import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { IUsers } from 'src/app/user/Model/users';
import { UserService } from 'src/app/user/user.service';
import { AlbumService } from '../album.service';
import { IAlbum } from '../model/album';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  user: UserAuth = {};

  route: ActivatedRoute;
  message: boolean = false;

  constructor(private albumService: AlbumService, route: ActivatedRoute, 
    private router: Router, private authService: AuthService) 
  { 
    this.route = route;
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()!;
  }

  album: IAlbum = {
    AlbumName: '',
    UserId: this.user.userId,
    AlbumDescription: '',
  };

  addAlbum(): void {
    this.album.UserId = this.user.userId;
    this.albumService.addAlbum(this.album).subscribe(album => this.album == album);
    this.router.navigate([`${this.user.firstName! + this.user.lastName! + this.user.userId}/albums`]);
  }

  cancel(){
    this.ngOnInit();
    this.router.navigate([`${this.user.firstName! + this.user.lastName! + this.user.userId}/albums`]);
  }

  
}
