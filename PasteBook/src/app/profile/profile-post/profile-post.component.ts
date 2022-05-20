import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, concatMap, map, Observable, tap } from 'rxjs';
import { INewsFeedPosts } from 'src/app/home-page/newsfeed/Model/newsfeedpost';
import { NewsfeedapiService } from 'src/app/home-page/newsfeed/newsfeedapi.service';
import { NotificationService } from 'src/app/navigation-bar/notification/notification.service';
import { IPost } from 'src/app/post/Model/posts';
import { PostService } from 'src/app/post/post.service';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { IUsers } from '../model/profile';
import { ProfileService } from '../profile.service';


@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.scss']
})
export class ProfilePostComponent implements OnInit {
  loggedInUser: UserAuth = {};
  userName!: string;
  users!:Observable<IUsers[]>;
  result!: any;
  mapUserToResult$!:Observable<any>;
  currentWallId!: number;
  postContent!: string;

  constructor(private route: ActivatedRoute, private profileService: ProfileService,
    private authService: AuthService, private postService: PostService,
    private newsfeedapiService:NewsfeedapiService, private noifService: NotificationService) {
     }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser()!;
    this.route.paramMap.subscribe(
      params => {
        params.get('string')? this.userName = params.get('string')! : '';
        
        this.users = this.newsfeedapiService.getUsers();  
        
        this.profileService.getUserByUserName(this.userName)
        .pipe(
          tap(u => this.currentWallId = u[0].userId!),
          concatMap(users => users.map((u:IUsers)=>this.postService.getPostsByUserId((u.userId)?.toString()!))),
          map(posts => combineLatest([
            posts,
            this.users
          ]).pipe(
            map(([posts, users])=> posts.map(
              (post: INewsFeedPosts) => ({
                post: ({
                  postId: post.post.postId,
                  userId: users.find(u => u.userId === post.post.userId),
                  postContent: post.post.postContent,
                  postDate: post.post.postDate
                }),
                commentCount: post.commentCount,
                likeCount: post.likeCount
          })))))).subscribe(response => this.result = response);
      });        
  }

  addPost(): void {
    let newPost:IPost = {
      userId: this.loggedInUser.userId,
      postContent: this.postContent,
      wallUserId: this.currentWallId
    }

    this.profileService.addPosts(newPost).subscribe(post => {
      if(Number(this.loggedInUser.userId) != Number(this.currentWallId)){
        this.noifService.CreatePostNotif(this.currentWallId, post.postId!)
      }
      this.postContent = '';
      this.ngOnInit();
    });
  }

}
