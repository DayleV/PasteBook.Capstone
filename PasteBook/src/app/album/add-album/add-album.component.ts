import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  
  user: IUsers | any = [];
  album$: Observable<IAlbum[]> | undefined;
  route: ActivatedRoute;
  id: number = 0;
  

  constructor(private albumService: AlbumService, route: ActivatedRoute, 
    private router: Router, private userService: UserService) 
  { 
    this.route = route;
  }

  ngOnInit(): void {
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    // this.albumService.getAlbum(this.id).subscribe(album => {
    //   this.album = album;
    //   });
  }

  album: IAlbum = {
    AlbumName: '',
    UserId: 1,
    AlbumDescription: '',
  };

  addAlbum(): void {
    console.log(this.album)
    this.albumService.addAlbum(this.album).subscribe(album => this.album == album);
    this.router.navigate(['view-albums']);
  }
}
