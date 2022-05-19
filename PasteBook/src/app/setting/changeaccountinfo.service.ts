import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../configuration/configuration.service';
import { IUpdateUserEmailRequest } from './change-email/Model/update_email';
import { Observable } from 'rxjs';
import { IUpdateUserPasswordRequestData } from './change-password/Model/update_password';

const API_ENDPOINT = "change-password"

@Injectable({
  providedIn: 'root'
})
export class ChangeaccountinfoService {
  apiUrl: string = "";

  constructor(private http:HttpClient, private configService: ConfigurationService) { 
    this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;
  }

  updateUserEmail(entity: IUpdateUserEmailRequest): Observable<IUpdateUserEmailRequest> {
    return this.http.post<IUpdateUserEmailRequest>(this.apiUrl, entity);
  }

  updateUserPassword(entity: IUpdateUserPasswordRequestData): Observable<IUpdateUserPasswordRequestData> {
    return this.http.post<IUpdateUserPasswordRequestData>(this.apiUrl, entity);
  }
}
