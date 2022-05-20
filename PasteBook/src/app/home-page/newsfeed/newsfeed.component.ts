import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { IUsers } from 'src/app/user/Model/users';
import { INewsFeedPosts } from './Model/newsfeedpost';
import { NewsfeedapiService } from './newsfeedapi.service';
import { UserService } from 'src/app/user/user.service';
import { IPost } from 'src/app/post/Model/posts';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  mapNewsFeedPosts$!:Observable<any>;
  newsFeedPosts$!:Observable<INewsFeedPosts[]>;
  loggedInUser: UserAuth = {};
  users!:Observable<IUsers[]>;
  updateNewsFeedPosts: any;
  totalNewsFeedPosts: number = 0;
  limit:number = 10;
  disableAddScroll:boolean = false;

  constructor(private service:NewsfeedapiService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    //To Use User's Profile Data
    this.users = this.service.getUsers();    
    this.loggedInUser = this.authService.getLoggedInUser()!;
    this.newsFeedPosts$ = this.service.getNewsFeedPosts(this.loggedInUser.userId!);

    // this.updateNewsFeedPosts = setInterval(()=>{
    //   this.newsFeedPosts$ = this.service.getNewsFeedPosts(this.loggedInUser.userId!);
    // }, 60000);
    
    this.mapNewsFeedPosts$ = combineLatest([
      this.newsFeedPosts$,
      this.users
    ]).pipe(
      map(([posts, users]) => posts.map(
        (posts: INewsFeedPosts) => ({
          post: ({
            postId: posts.post.postId,
            userId: users.find(u => u.userId === posts.post.userId),
            postContent: posts.post.postContent,
            postDate: posts.post.postDate,
          }),
          commentCount: posts.commentCount,
          likeCount: posts.likeCount
        })))
    ).pipe(tap(x => this.totalNewsFeedPosts = x.length));

    this.updateNewsFeedPosts = setInterval(()=>{
      this.mapNewsFeedPosts$ = combineLatest([
        this.newsFeedPosts$,
        this.users
      ]).pipe(
        map(([posts, users]) => posts.map(
          (posts: INewsFeedPosts) => ({
            post: ({
              postId: posts.post.postId,
              userId: users.find(u => u.userId === posts.post.userId),
              postContent: posts.post.postContent,
              postDate: posts.post.postDate,
            }),
            commentCount: posts.commentCount,
            likeCount: posts.likeCount
          })))
      );
    }, 60000);
  }

  onScrollDown(){
    this.limit += 10;
    if(this.limit > this.totalNewsFeedPosts){
      this.disableAddScroll = true;
    }
  }
  
  //To disable refresh when in other routes
  ngOnDestroy(){
    if(this.updateNewsFeedPosts){
      clearInterval(this.updateNewsFeedPosts);
    }
  }
}
