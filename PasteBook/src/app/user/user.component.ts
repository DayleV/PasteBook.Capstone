import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IPost, IUsers } from './Model/users';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: IUsers[] = [];
  users$: Observable<IUsers[]> | undefined;
  post: IPost | undefined;

  newPost: IPost = {
    UserId: 1,
    PostContent: "Some",
    PostDate: "2022-05-11T08:14:59.103Z"
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: users => this.users = users
    });

    this.users$ = this.userService.getUsers();
  }

  some(){
    this.userService.postPost(this.newPost).subscribe(post => this.post = post);
  }
}
