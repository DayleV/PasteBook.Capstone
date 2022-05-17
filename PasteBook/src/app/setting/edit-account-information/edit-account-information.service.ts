import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/configuration/configuration.service';
import { IUpdateCredentials } from './Model/accountinformation';

const API_ENDPOINT = "change-password"

@Injectable({
  providedIn: 'root'
})
export class EditAccountInformationService {

  apiUrl: string = "";

  constructor(private http:HttpClient, private configService: ConfigurationService) { 
    this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;
  }

  updateUserCredentials(entity: IUpdateCredentials): Observable<IUpdateCredentials> {
    return this.http.post<IUpdateCredentials>(this.apiUrl, entity);
  }
}
