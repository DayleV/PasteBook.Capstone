import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlbumService } from '../album/album.service';
import { IAlbum } from '../album/model/album';
import { INewsFeedPosts } from '../home-page/newsfeed/Model/newsfeedpost';
import { IPosts } from '../post/Model/posts';
import { PostService } from '../post/post.service';
import { ProfileService } from '../profile/profile.service';
import { AuthService } from '../security/auth.service';
import { UserAuth } from '../security/Model/user-auth';
import { IPost, IUsers } from '../user/Model/users';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {


  user: UserAuth = {};

  post: IPosts = {
    UserId: this.user.userId,
    PostContent: ''
  }

  posts: IPosts | any = [];
  albums: IAlbum | any = [];
  users: IUsers | any = [];
  id: number = 0;
  text: string = '';
  newText: number = 0;
  

  route: ActivatedRoute;
  


  constructor(private albumService: AlbumService, route: ActivatedRoute,
    private profileService: ProfileService, private router: Router,
    private postService: PostService, private http: HttpClient,
    private authService: AuthService) {
      this.route = route;
     }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()!;

    // this.text = String(this.route.snapshot.paramMap.get('string'));
    // console.log(this.text)
    // this.newText = Number(this.text.replace('/[0-9]/g', ''));


    var str = (String(this.route.snapshot.paramMap.get('string'))).match(/\d+/);
    var num = str? str[0]: 0;
    
    console.log(num)
    this.profileService.getUserById(Number(num)).subscribe(users => {
    this.users = users;
    });
    console.log(this.users)
    

    this.profileService.getPostsByUserId(Number(num)).subscribe(posts => {
      this.posts = posts;
      });
      console.log(this.posts.length)

  }

  addPost(): void {
    this.post.UserId = this.user.userId;
    //this.postService.addPosts(this.post).subscribe(post => this.post = post);
  }
}
