import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { PostService } from '../post/post.service';
import { AuthService } from '../security/auth.service';
import { UserAuth } from '../security/Model/user-auth';
import { IUsers } from '../profile-display/model/profile-display';
import { IPostDisplay } from './model/post-display';
import { PostDisplayService } from './post-display.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.scss']
})
export class PostDisplayComponent implements OnInit {
  
  user: UserAuth = {};


  posts$!: Observable<IPostDisplay[]>;
  users: IUsers | any = [];
  route: ActivatedRoute;
  checker: boolean = true;
  error: boolean = false;

  constructor(route: ActivatedRoute, private postDisplayService: PostDisplayService, 
    private router: Router, private postService: PostService, private authService: AuthService) {
      this.route = route;
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()!;

    let str = (String(this.route.snapshot.paramMap.get('string'))).match(/\d+/);
    let id = str? str[0]: 0;
    
    this.postDisplayService.getUserById(Number(id)).pipe(
      catchError(err => {
        if(Number(err.status) === 404){
          this.error = true;
        }
        return EMPTY
      })
    ).subscribe(users => {
    this.users = users;
    });
    
    this.posts$ = this.postDisplayService.getPostsByUserId(Number(id));

    if(id != this.user.userId){
      this.checker = false;
    }
  }
}

