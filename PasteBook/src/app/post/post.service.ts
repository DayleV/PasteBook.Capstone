import { Injectable } from '@angular/core';
import { Observable, of, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPost, IPostDetail, IPosts } from './Model/posts';
import { ConfigurationService } from '../configuration/configuration.service';

const API_ENDPOINT = "posts";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiUrl: string = "";

  constructor(private http: HttpClient, 
    private configService: ConfigurationService) {
      this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;
      console.log(this.apiUrl);
    }
    
    getPostsById(PostId: string): Observable<IPostDetail> {
      return this.http.get<IPostDetail>(`${this.apiUrl}/${PostId}`);
    }
  }
