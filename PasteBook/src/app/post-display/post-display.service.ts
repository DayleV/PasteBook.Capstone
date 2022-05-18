import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';
import { IUsers } from '../profile-display/model/profile-display';
import { IPostDisplay } from './model/post-display';

@Injectable({
  providedIn: 'root'
})
export class PostDisplayService {
  apiUrl: string = "";

  constructor(private http: HttpClient, 
    private configService: ConfigurationService) {
      this.apiUrl = this.configService.settings.apiUrl;
    }

    getUserById(id: number): Observable<IUsers> {
      return this.http.get<IUsers>(`${this.apiUrl}users/${id}`);
    }

    getPostsByUserId(id: number): Observable<IPostDisplay[]> {
      return this.http.get<IPostDisplay[]>(`${this.apiUrl}timeline/${id}`);
    }
}
