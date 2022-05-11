import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUsers } from './Model/users';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: IUsers[] = [];
  users$: Observable<IUsers[]> | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: users => this.users = users
    });

    this.users$ = this.userService.getUsers();
  }

}
