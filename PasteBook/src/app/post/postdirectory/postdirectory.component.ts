import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, pipe, tap } from 'rxjs';
import { IPosts } from '../Model/posts';
import { ILikes } from '../like/Model/likes';
import { LikeService } from '../like/like.service';
import { IComments } from '../comment/Model/comments';
import { CommentService } from '../comment/comment.service';
import { PostdirectoryService } from './postdirectory.service';
import { ActivatedRoute } from '@angular/router';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-postdirectory',
  templateUrl: './postdirectory.component.html',
  styleUrls: ['./postdirectory.component.scss']
})
export class PostdirectoryComponent implements OnInit {

  id: number = 0;
  loggedInUser: UserAuth ={};

  newLike: ILikes = {
    PostId: 1,
    UserId: this.loggedInUser.userId
  };

  newComment: IComments = {
    PostId: 1,
    UserId: this.loggedInUser.userId,
    CommentContent: ''
  };

  commentText: any[];

  posts$!: Observable<IPosts[]| any>;
  likes$: Observable<ILikes[]> | undefined;
  comments$: Observable<IComments[]> | any;

  @Input() numberOfLikes : number = 0;
  @Input() numberOfComments : number = 0;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private likeService: LikeService,
    private commentService: CommentService,
    private postDirectory: PostdirectoryService,
    private route: ActivatedRoute,
    private authService: AuthService
    ) {
      this.commentText = [];
   }

  ngOnInit(): void {  
    this.loggedInUser = this.authService.getLoggedInUser()!;
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.posts$ = this.postDirectory.getPostsById(this.id);  
    console.log(this.posts$);
  }

  likeButtonClick() {   
    this.newLike.UserId = this.loggedInUser.userId;
    this.likeService.addLikes(this.newLike).subscribe(newLike => this.newLike == newLike);
    console.log(this.newLike); 
    this.numberOfLikes++;
    this.change.emit(this.numberOfLikes);   
  }

  commentOnClick(){
    this.newComment.UserId = this.loggedInUser.userId;
    this.commentService.addComments(this.newComment).subscribe(newComment => this.newComment == newComment);
    console.log(this.newComment);
    this.numberOfComments++;
    this.change.emit(this.numberOfComments);   
  }

  onSubmitOfComment(f: NgForm): void{
    let renderComment = f.value.renderComment;
    this.commentText.push({
      'renderComment': renderComment
    })
  }
  
}
