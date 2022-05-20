import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/post/post.service';
import { IProfileAlbum, IUsers } from 'src/app/profile/model/profile';
import { ProfileService } from 'src/app/profile/profile.service';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { AlbumService } from '../album.service';
import { IAlbum } from '../model/album';

@Component({
  selector: 'app-view-album',
  templateUrl: './view-album.component.html',
  styleUrls: ['./view-album.component.scss']
})
export class ViewAlbumComponent implements OnInit {

  user: UserAuth = {};

  albums$!: Observable<IProfileAlbum[]>;
  users: IUsers | any = [];
  checker: boolean = true;
  userName!: string;

  route: ActivatedRoute;

  constructor(route: ActivatedRoute, private profileService: ProfileService, 
    private router: Router, private postService: PostService, private authService: AuthService,
    private albumService: AlbumService) {
      this.route = route;
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()!;
    

    this.route.paramMap.subscribe(
      params => {
        params.get('string')? this.userName = params.get('string')! : '';
      }
    );
    
    this.profileService.getUserByUserName(this.userName).subscribe(users => {
      this.users = users;
      this.albums$ = this.profileService.getAlbumsByUserId(this.users[0].userId);
      });

    // var str = (String(this.route.snapshot.paramMap.get('string'))).match(/\d+/);
    // var id = str? str[0]: 0;
    
    // if(id != this.user.userId){
    //   this.checker = false;
    // }

  }
  albums: IAlbum = {
    UserId: this.user.userId,
    AlbumName: '',
    AlbumDescription: '',
  }

  deleteAlbum(id: number): void{
    this.albumService.delete(id).subscribe(albums => this.albums == albums);
    this.router.navigate(['view-albums']);
    window.location.reload();
  }

  cancel(){
    this.ngOnInit();
    this.router.navigate([`${this.user.userName}/albums`]);
  }
  
}
