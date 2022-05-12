import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../album.service';
import { IAlbum } from '../../model/album';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  album: IAlbum | any = [];
  id: number = 0;
  route: ActivatedRoute;


  constructor(private albumService: AlbumService, route: ActivatedRoute) {
    this.route = route;
   }

  ngOnInit(): void{
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.albumService.getAlbum(this.id).subscribe(album => {
      this.album = album;
      });
      console.log(this.id)
      console.log(this.album)
  }

}
