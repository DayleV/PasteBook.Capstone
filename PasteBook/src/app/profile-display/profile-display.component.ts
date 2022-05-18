import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { PostService } from '../post/post.service';
import { AuthService } from '../security/auth.service';
import { UserAuth } from '../security/Model/user-auth';
import { IUsers } from './model/profile-display';
import { ProfileDisplayService } from './profile-display.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.scss']
})
export class ProfileDisplayComponent implements OnInit {

  user: UserAuth = {};
  users: IUsers | any = [];
  route: ActivatedRoute;
  
  checker: boolean = true;
  error: boolean = false;

  constructor(route: ActivatedRoute, private profileDisplayService: ProfileDisplayService, 
    private router: Router, private postService: PostService, private authService: AuthService, 
    private userService: UserService) {
      this.route = route;
  }

  ngOnInit(): void {
    
    this.user = this.authService.getLoggedInUser()!;
    this.userService.getUsers().subscribe({
      next: users => this.users = users
    });
    
    this.user = this.authService.getLoggedInUser()!;
    let str = (String(this.route.snapshot.paramMap.get('string'))).match(/\d+/);
    let id = str? str[0]: 0;
    if(id === 0)
    {
      this.profileDisplayService.getUserById(Number(this.user.userId)).pipe(
        catchError(err => {
          if(Number(err.status) === 404){
            this.error = true;
          }
          return EMPTY
        })
      ).subscribe(users => {
      this.users = users;
      });
      
      if(id != this.user.userId){
        this.checker = false;
      }
    }
    else
    {
      this.profileDisplayService.getUserById(Number(id)).pipe(
        catchError(err => {
          if(Number(err.status) === 404){
            this.error = true;
          }
          return EMPTY
        })
      ).subscribe(users => {
      this.users = users;
      });
      
      if(id != this.user.userId){
        this.checker = false;
      }
    }
  }
}
