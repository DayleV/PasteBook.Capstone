import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ILikes } from './Model/likes';
import { LikeService } from './like.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {

  newLike: ILikes = {
    PostId: 79,
    UserId: 3
  };

  likes$: Observable<ILikes[]> | undefined;

  constructor(private likeService: LikeService) { }

  ngOnInit(): void {
    this.likes$ = this.likeService.getLikes();
  }

  likeOnClick(){
    this.likeService.addLikes(this.newLike).subscribe(newLike => this.newLike = newLike);
    console.log(this.newLike);
  }
}
