import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../post/post.service';
import { AuthService } from '../security/auth.service';
import { UserAuth } from '../security/Model/user-auth';
import { IPost } from './model/add-post';
import { IUsers } from '../profile-display/model/profile-display';
import { AddPostService } from './add-post.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  user: UserAuth = {};

  post: IPost = {
    UserId: this.user.userId,
    PostContent: ''
  }

  users: IUsers | any = [];
  route: ActivatedRoute;
  checker: boolean = true;
  error: boolean = false;

  constructor(route: ActivatedRoute, private addPostService: AddPostService, 
    private router: Router, private postService: PostService, private authService: AuthService) {
      this.route = route;
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()!;
    // let str = (String(this.route.snapshot.paramMap.get('string'))).match(/\d+/);
    // let id = str? str[0]: 0;
    
    // this.profileService.getUserById(Number(id)).pipe(
    //   catchError(err => {
    //     if(Number(err.status) === 404){
    //       this.error = true;
    //     }
    //     return EMPTY
    //   })
    // ).subscribe(users => {
    // this.users = users;
    // });
    

    // if(id != this.user.userId){
    //   this.checker = false;
    // }
  }

  addPost(): void {
    this.post.UserId = this.user.userId;
    this.addPostService.addPosts(this.post).subscribe(post => this.post = post);
    this.ngOnInit();
  }

}
