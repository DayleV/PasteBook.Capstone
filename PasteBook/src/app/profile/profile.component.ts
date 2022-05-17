import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { PostService } from '../post/post.service';
import { AuthService } from '../security/auth.service';
import { UserAuth } from '../security/Model/user-auth';
import { IProfileAlbum, IPost, IProfilePosts, IUsers } from './model/profile';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserAuth = {};

  post: IPost = {
    UserId: this.user.userId,
    PostContent: ''
  }

  posts$!: Observable<IProfilePosts[]>;
  albums$!: Observable<IProfileAlbum[]>;
  users: IUsers | any = [];
  route: ActivatedRoute;
  checker: boolean = true;
  error: boolean = false;

  constructor(route: ActivatedRoute, private profileService: ProfileService, 
    private router: Router, private postService: PostService, private authService: AuthService) {
      this.route = route;
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()!;

    let str = (String(this.route.snapshot.paramMap.get('string'))).match(/\d+/);
    let id = str? str[0]: 0;
    
    this.profileService.getUserById(Number(id)).pipe(
      catchError(err => {
        if(Number(err.status) === 404){
          this.error = true;
        }
        return EMPTY
      })
    ).subscribe(users => {
    this.users = users;
    });
    
    this.posts$ = this.profileService.getPostsByUserId(Number(id));
    this.albums$ = this.profileService.getAlbumsByUserId(Number(id));

    if(id != this.user.userId){
      this.checker = false;
    }
  }

  addPost(): void {
    this.post.UserId = this.user.userId;
    this.profileService.addPosts(this.post).subscribe(post => this.post = post);
  }

}
