import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';
import { IProfileAlbum, IPost, IProfilePosts, IUsers, IUserFriend, IUser_Friends } from './model/profile';

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

    getUserById(id: number | undefined): Observable<IUsers> {
      return this.http.get<IUsers>(`${this.apiUrl}users/${id}`);
    }

    getFriends(): Observable<IUser_Friends[]> {
      return this.http.get<IUser_Friends[]>(this.apiUrl+'userfriends');
    }

    getPostsByUserId(id: number): Observable<IProfilePosts[]> {
      return this.http.get<IProfilePosts[]>(`${this.apiUrl}timeline/${id}`);
    }

    getAlbumsByUserId(id: number): Observable<IProfileAlbum[]> {
      return this.http.get<IProfileAlbum[]>(`${this.apiUrl}profile-album/${id}`);
    }

    // getFriendRequestsByUserId(id: number | undefined): Observable<IUserFriend[]> {
    //   return this.http.get<IUserFriend[]>(`${this.apiUrl}friendrequest/${id}`);
    // }

    // getRequestById(id: number | undefined): Observable<IUser_Friends> {
    //   return this.http.get<IUser_Friends>(`${this.apiUrl}friendrequest/${id}`);
    // }

    addPosts(entity: IPost): Observable<IPost>{
      return this.http.post<IPost>(`${this.apiUrl}posts`, entity);
    }

    addUserFriendRequest(entity: IUser_Friends): Observable<IUser_Friends>{
      console.log(entity)
      return this.http.post<IUser_Friends>(`${this.apiUrl}userfriends`, entity);
    }

    DeleteUserFriendRequest(id: number | undefined): Observable<IUser_Friends>{
      return this.http.delete<IUser_Friends>(`${this.apiUrl}userfriends/${id}`);
    }

    getAllRequest(): Observable<IUser_Friends[]> {
      return this.http.get<IUser_Friends[]>(`${this.apiUrl}userfriends`);
    }

    update(id: number | undefined, entity: IUser_Friends): Observable<IUser_Friends> {
      console.log(entity)
      console.log(id)
      return this.http.put<IUser_Friends>(`${this.apiUrl}userfriends/${id}`, entity);
    }

    delete(id: number | undefined): Observable<IUser_Friends> {
      return this.http.delete<IUser_Friends>(`${this.apiUrl}userfriends/${id}`);
    }

    

}
