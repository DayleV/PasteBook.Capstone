import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPost } from './Model/posts';
import { ConfigurationService } from '../configuration/configuration.service';


const API_ENDPOINT = "posts";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  api = "https://localhost:44368/"
  apiUrl: string = "";

  constructor(private http: HttpClient, 
    private configService: ConfigurationService) {
      this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;
      console.log(this.apiUrl);
    }

    getAllPost(): Observable<IPost[]> {  
      return this.http.get<IPost[]>(this.apiUrl);  
    } 

    addPost(entity: IPost): Observable<IPost> {  
      console.log(entity);
      return this.http.post<IPost>(this.apiUrl, entity);  
    } 
}
