import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlbum } from '../album/model/album';
import { ConfigurationService } from '../configuration/configuration.service';
import { IPosts } from '../post/Model/posts';
import { IUsers } from '../user/Model/users';

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

    getPostsByUserId(id: number): Observable<IPosts[]> {
      return this.http.get<IPosts[]>(`${this.apiUrl}timeline/${id}`);
    }

    getAlbumsByUserId(id: number): Observable<IAlbum[]> {
      return this.http.get<IAlbum[]>(`${this.apiUrl}timeline/${id}`);
    }
}
