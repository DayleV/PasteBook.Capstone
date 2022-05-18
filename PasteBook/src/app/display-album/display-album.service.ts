import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';
import { IProfileAlbum, IUsers } from '../profile/model/profile';

@Injectable({
  providedIn: 'root'
})
export class DisplayAlbumService {

  apiUrl: string = "";

  constructor(private http: HttpClient, 
    private configService: ConfigurationService) {
      this.apiUrl = this.configService.settings.apiUrl;
    }

    getUserById(id: number): Observable<IUsers> {
      return this.http.get<IUsers>(`${this.apiUrl}users/${id}`);
    }

    getAlbumsByUserId(id: number): Observable<IProfileAlbum[]> {
      return this.http.get<IProfileAlbum[]>(`${this.apiUrl}profile-album/${id}`);
    }
}
