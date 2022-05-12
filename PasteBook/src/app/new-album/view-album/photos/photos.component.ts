import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { AlbumService } from '../../album.service';
import { IAlbum } from '../../model/album';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  album: IAlbum | any = [];
  id: string = '';
  route: ActivatedRoute;


  constructor(private albumService: AlbumService, route: ActivatedRoute) {
    this.route = route;
   }

  ngOnInit(): void{
    this.id = this.route.snapshot.paramMap.get('id') as string;

    this.albumService.getAlbum(this.id)
    .pipe(tap(a=>console.log(a)))
    .subscribe(album => {
      this.album = album;
      });
      console.log(this.id)
      console.log(this.album)
  }

}
