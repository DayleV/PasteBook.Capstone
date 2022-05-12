import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IComments } from './Model/comments';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  newComment: IComments = {
    PostId: 79,
    UserId: 3,
    CommentContent: "mypost",
    CommentDate: "commentDate"
  };

  comments$: Observable<IComments[]> | undefined;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.comments$ = this.commentService.getComments();
  }

  commentOnClick(){
    this.commentService.addComments(this.newComment).subscribe(newComment => this.newComment == newComment);
    console.log(this.newComment);
  }

}
