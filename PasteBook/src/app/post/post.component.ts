import { Component, Input, NgModule, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, Observable, pipe, tap } from 'rxjs';
import { AuthService } from '../security/auth.service';
import { UserAuth } from '../security/Model/user-auth';
import { IComment, ILike, IPost, IPostDetail, IPosts } from './Model/posts';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postDetail$!: Observable<IPostDetail>;
  commentCount!: number | undefined;
  isLiked: boolean = false;
  id! :string;
  user: UserAuth = {};
  like!: ILike;
  comment!: string;
  showComments: boolean = false;
  error!: number;
  errorMessage: string ='';

  constructor(private postService: PostService, private route: ActivatedRoute,
    private authService: AuthService) {
  }

  ngOnInit(): void {      
    this.user = this.authService.getLoggedInUser()!;
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id')!;
      });
    this.postDetail$ = this.postService.getPostsById(this.id).pipe(
      catchError(err => {
        this.error = err.status;
        this.HandleError(err.status);
        return EMPTY;
      }),
      tap(p => {
        if(p)
          this.checkLikeStatus(p.likes!);
      })
    );
  }
  HandleError(status: number): string{
    if(status === 404)
      this.errorMessage = "Post Not Found";

    if(status === 401)
      this.errorMessage = "Unauthorized Access";

    return this.errorMessage;
  }
  ShowComments(){
    this.showComments = !this.showComments;
  }

  AddComment(postId: number){
    if(this.comment){
      let newComment: IComment = {
        postId: Number(postId),
        userId: Number(this.user.userId),
        commentContent: this.comment,
        commentDate: new Date().toLocaleString()
      }
      this.postService.addComment(newComment).subscribe(
        respone => this.ngOnInit()
      );
    }
  }

  checkLikeStatus(likes: ILike[]){
    this.commentCount = likes.length;
    likes.forEach(element => {
      if(Number(element.userId) === Number(this.user.userId)){
        this.isLiked = true;
      }
    });
  }

  likePost(postId: number){
    let newLike: ILike = {
      userId: Number(this.user.userId),
      postId: postId
    };
    this.postService.likePost(newLike).subscribe(
      respone => {
        this.isLiked = true;
        this.ngOnInit()
      }
    );
  }

  unLikePost(postId: number){
    this.postService.getLikes().
    subscribe(respone => respone
      .filter(l => l.postId === postId && Number(l.userId) === Number(this.user.userId))
      .map(like => {
        this.postService.unLikePost(like.likeId!).subscribe(
          del => {
            this.isLiked = false;
            this.ngOnInit();
          }
        );
      })
    );
  }
}
