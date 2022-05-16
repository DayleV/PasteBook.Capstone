import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { IUsers } from './Model/users';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  search$ = new BehaviorSubject<string>('');  
  users$: Observable<IUsers[]> | undefined;
  filteredUsers$: Observable<IUsers[]> | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {    
    this.route.queryParamMap.subscribe(
      params => {
        this.search$.next(params.get('filter')!);
      }
    );
    this.users$ = this.userService.getUsers();
    this.filteredUsers$ = combineLatest([
      this.users$,
      this.search$
    ]).pipe(
      map(([users, search]) => users.filter((users: any) => users.firstName.includes(search) ||
      users.lastName.includes(search))
    ));
  }
}