import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';
import { IProfileAlbum, IPost, IProfilePosts, IUsers } from './model/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl: string = "";

  constructor(private http: HttpClient, 
    private configService: ConfigurationService) {
      this.apiUrl = this.configService.settings.apiUrl;
      console.log(this.apiUrl);
    }

    getUserById(id: number): Observable<IUsers> {
      return this.http.get<IUsers>(`${this.apiUrl}users/${id}`);
    }

    getPostsByUserId(id: number): Observable<IProfilePosts[]> {
      return this.http.get<IProfilePosts[]>(`${this.apiUrl}timeline/${id}`);
    }

    getAlbumsByUserId(id: number): Observable<IProfileAlbum[]> {
      console.log(`${this.apiUrl}profile-album/${id}`)
      return this.http.get<IProfileAlbum[]>(`${this.apiUrl}profile-album/${id}`);
    }
}
