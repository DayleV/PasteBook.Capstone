import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUsers } from 'src/app/user/Model/users';
import { INewsFeedPosts } from './Model/newsfeedpost';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedapiService {
  readonly newsfeedAPIUrl = "https://localhost:44368/timeline";
  readonly usersAPIUrl = "https://localhost:44368/users";

  constructor(private http:HttpClient) { }
  
  getInitialNewsFeedPosts(UserId:number|string):Observable<INewsFeedPosts[]>{
    return this.http.get<INewsFeedPosts[]>(this.newsfeedAPIUrl + `/${UserId}`).pipe(map(posts => posts.slice(0,10)))
  }

  getSucceedingNewsFeedPosts(UserId:number|string, ):Observable<INewsFeedPosts[]>{
    return this.http.get<INewsFeedPosts[]>(this.newsfeedAPIUrl + `/${UserId}`).pipe(map(posts => posts.slice(10,)))
  }

  getNewsFeedPosts(UserId:number|string):Observable<INewsFeedPosts[]>{
    return this.http.get<INewsFeedPosts[]>(this.newsfeedAPIUrl + `/${UserId}`)
  }

  getUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.usersAPIUrl);
  }
}
