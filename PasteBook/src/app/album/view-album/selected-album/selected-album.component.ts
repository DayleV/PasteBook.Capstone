import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/profile/profile.service';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { IUsers } from 'src/app/user/Model/users';
import { AlbumService } from '../../album.service';
import { IAlbum } from '../../model/album';
import { IPhoto } from './photo/model/photo';
import { PhotoService } from './photo/photo.service';

@Component({
  selector: 'app-selected-album',
  templateUrl: './selected-album.component.html',
  styleUrls: ['./selected-album.component.scss']
})
export class SelectedAlbumComponent implements OnInit {

  user: UserAuth = {};

  users: IUsers | any = [];
  album: IAlbum | any = [];
  photo: IPhoto | any = [];

  id: number = 0;
  route: ActivatedRoute;
  isEdit: boolean;
  checker: boolean = true;
  selectedFile: File | any =  null;
  userName!: string;

  constructor(private albumService: AlbumService, private photoService: PhotoService,
    route: ActivatedRoute, private router: Router, private http: HttpClient,
    private authService: AuthService, private profileService: ProfileService) {
    this.route = route;
    this.isEdit = false;
   }

  ngOnInit(): void{
    this.user = this.authService.getLoggedInUser()!;

    this.route.paramMap.subscribe(
      params => {
        params.get('string')? this.userName = params.get('string')! : '';
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        
        this.albumService.getAlbum(this.id).subscribe(album => {
        this.album = album;

        this.profileService.getUserByUserName(this.userName).subscribe(users => {
          this.users = users;
          });
      });
      }
    );
    
    

    // if(id != this.user.userId){
    //   this.checker = false;
    // }
  }

  cancel(){
    this.ngOnInit();
    this.isEdit = false;
    this.router.navigate([`${this.users[0]?.userName}/albums/${this.id}`]);
  }

  updateAlbum(){
    this.isEdit = true;
    this.ngOnInit();
  }

  saveAlbum(){
    this.albumService.update(this.id, this.album).subscribe(album => 
      {this.album == album
        this.ngOnInit();
      });
    this.isEdit = false;
    this.router.navigate([`${this.users[0].userName}/albums/${this.id}`]);
  }

  onFileSelected(event: any){
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    this.photoService.addPhoto(this.selectedFile).subscribe(album => 
      {this.album == album
        this.ngOnInit();
      });
    console.log(this.selectedFile)
  }
  
}
