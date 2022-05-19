import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsers } from 'src/app/user/Model/users';
import { INewsFeedPosts } from './Model/newsfeedpost';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedapiService {
  readonly newsfeedAPIUrl = "https://localhost:44368/timeline";
  readonly usersAPIUrl = "https://localhost:44368/users";

  constructor(private http:HttpClient) { }

  getNewsFeedPosts(UserId:number|string):Observable<INewsFeedPosts[]>{
    return this.http.get<INewsFeedPosts[]>(this.newsfeedAPIUrl + `/${UserId}`)
  }
  getUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.usersAPIUrl);
  }
}
