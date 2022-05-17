import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { IUsers } from 'src/app/user/Model/users';
import { INewsFeedPosts } from './Model/newsfeedpost';
import { NewsfeedapiService } from './newsfeedapi.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  newsFeedPosts$!:Observable<INewsFeedPosts[]>;
  loggedInUser: UserAuth = {};
  users: IUsers[] = [];
  updateNewsFeedPosts: any;

  //To Map UserId and User's Name
  userFullNameMap: Map<number, string> = new Map();

  constructor(private service:NewsfeedapiService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    //To Use User's Profile Data
    this.userService.getUsers().subscribe({
      next: users => this.users = users
    });
    
    this.loggedInUser = this.authService.getLoggedInUser()!;
    this.newsFeedPosts$ = this.service.getNewsFeedPosts(this.loggedInUser.userId!);
    this.updateNewsFeedPosts = setInterval(()=>{
      this.newsFeedPosts$ = this.service.getNewsFeedPosts(this.loggedInUser.userId!);
    }, 3000);
  }

  ngOnDestroy(){
    if(this.updateNewsFeedPosts){
      clearInterval(this.updateNewsFeedPosts);
    }
  }

  // refreshUserFullNameMap(){
  //   this.userService.getUsers().subscribe(data =>{
  //     this.users = data;
  //     for(let i=0; i < data.length; i++){
  //       this.userFullNameMap.set(this.users[i].UserId, this.users[i].FirstName + this.users[i].LastName)
  //     }
  //   })
  // }

}
