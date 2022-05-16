import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INewsFeedPosts } from './Model/newsfeedpost';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedapiService {
  readonly newsfeedAPIUrl = "https://localhost:44368/timeline";

  constructor(private http:HttpClient) { }

  getNewsFeedPosts(UserId:number|string):Observable<INewsFeedPosts[]>{
    return this.http.get<INewsFeedPosts[]>(this.newsfeedAPIUrl + `/${UserId}`)
  }
}
