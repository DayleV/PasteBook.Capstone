import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { catchError, EMPTY } from 'rxjs';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { IPost, IProfilePosts, IUsers } from '../model/profile';
import { ProfileService } from '../profile.service';


@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.scss']
})
export class ProfilePostComponent implements OnInit {
  user: UserAuth = {};
  
  post: IPost = {
    UserId: this.user.userId,
    PostContent: ''
  }
  posts$!: Observable<IProfilePosts[]>;
  users: IUsers | any = [];
  route: ActivatedRoute;
  id: any;
  error: boolean = false;

  constructor(route: ActivatedRoute, private profileService: ProfileService,
    private authService: AuthService) {
      this.route = route;
     }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()!;
    this.posts$ = this.profileService.getPostsByUserId(Number(this.id));

    var str = (String(this.route.snapshot.paramMap.get('string'))).match(/\d+/);
    this.id = str? str[0]: 0;

    this.profileService.getUserById(Number(this.id)).pipe(
      catchError(err => {
        if(Number(err.status) === 404){
          this.error = true;
        }
        return EMPTY
      })
    ).subscribe(users => {
    this.users = users;
    });
    

    this.posts$ = this.profileService.getPostsByUserId(Number(this.id));
  }

  addPost(): void {
    this.post.UserId = this.user.userId;
    console.log(this.post)
    this.profileService.addPosts(this.post).subscribe(post => this.post = post);
  }

}
