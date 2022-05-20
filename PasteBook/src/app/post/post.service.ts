import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IComment, ILike, IPost, IPostDetail, IPosts } from './Model/posts';
import { ConfigurationService } from '../configuration/configuration.service';
import { INewsFeedPosts } from '../home-page/newsfeed/Model/newsfeedpost';

const API_ENDPOINT = "posts";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiUrl: string = "";

  constructor(private http: HttpClient, 
    private configService: ConfigurationService) {
      this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;
    }
    
  getPostsById(PostId: string): Observable<IPostDetail> {
    return this.http.get<IPostDetail>(`${this.apiUrl}/${PostId}`);
  }
  getPostsByUserId(UserId: string): Observable<INewsFeedPosts[]> {
    return this.http.get<INewsFeedPosts[]>(`${this.apiUrl}/profile/${UserId}`);
  }
  
  addComment(comment: IComment): Observable<IComment>{
    return this.http.post<IComment>(this.configService.settings.apiUrl+'comments', comment);
  }

  likePost(like: ILike): Observable<ILike>{
    return this.http.post<ILike>(this.configService.settings.apiUrl+'likes', like);
  }

  unLikePost(id: number): Observable<ILike>{
    return this.http.delete<ILike>(this.configService.settings.apiUrl+"likes"+"/"+id);
  }

  getLikes(): Observable<ILike[]> {
    return this.http.get<ILike[]>(this.configService.settings.apiUrl+'likes');
  }
}
