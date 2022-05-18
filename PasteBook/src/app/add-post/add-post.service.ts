import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';
import { IUsers } from '../profile-display/model/profile-display';
import { IPost } from './model/add-post';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {
  apiUrl: string = "";

  constructor(private http: HttpClient, 
    private configService: ConfigurationService) {
      this.apiUrl = this.configService.settings.apiUrl;
    }

    getUserById(id: number): Observable<IUsers> {
      return this.http.get<IUsers>(`${this.apiUrl}users/${id}`);
    }

    addPosts(entity: IPost): Observable<IPost>{
      return this.http.post<IPost>(`${this.apiUrl}posts`, entity);
    }

}
