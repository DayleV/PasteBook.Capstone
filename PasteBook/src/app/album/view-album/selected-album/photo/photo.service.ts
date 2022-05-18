import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPhoto } from './model/photo';
import { ConfigurationService } from 'src/app/configuration/configuration.service';

const API_ENDPOINT = "photos";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  photo$ = new BehaviorSubject<IPhoto[]>([]);

  apiUrl: string = "";

  constructor(private http: HttpClient, 
    private configService: ConfigurationService) {

      this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;

    }

    getAllPhotos(): Observable<IPhoto[]> {
      return this.http.get<IPhoto[]>(this.apiUrl);
    }
    
    getPhoto(id: number): Observable<IPhoto> {
      return this.http.get<IPhoto>(`${this.apiUrl}/${id}`);
    }
  
    addPhoto(fileToUpload: File, albumId?:string){
      const formData: FormData = new FormData();
      formData.append('image', fileToUpload, fileToUpload.name);
      formData.append('albumId', albumId!);
      return this.http.post(`${this.apiUrl}/upload`, formData);
    }

    getPhotosByAlbumId(albumId:string): Observable<IPhoto[]>{
      return this.http.get<IPhoto[]>(`${this.apiUrl}/byAlbum/${albumId}`);
    }

    delete(id: number): Observable<IPhoto> {
      return this.http.delete<IPhoto>(`${this.apiUrl}/${id}`);
    }

}
