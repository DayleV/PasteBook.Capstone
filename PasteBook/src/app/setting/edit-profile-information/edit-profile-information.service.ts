import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsers } from 'src/app/user/Model/users';

@Injectable({
  providedIn: 'root'
})
export class EditProfileInformationService {
  readonly usersAPIUrl = "https://localhost:44368/users";

  constructor(private http:HttpClient) { }

  getUser(UserId?:number):Observable<IUsers[]>{
    return this.http.get<IUsers[]>(this.usersAPIUrl + `/${UserId}`)
  }
}
