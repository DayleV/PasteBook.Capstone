import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { IUserRegistrations } from './Model/userregistrations';
import { ConfigurationService } from '../configuration/configuration.service';

const API_ENDPOINT = "register";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  apiUrl: string = "";

  constructor(private http: HttpClient, 
    private configService: ConfigurationService) {

      this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;

    }

    addUser(entity: IUserRegistrations): Observable<IUserRegistrations> {
      return this.http.post<IUserRegistrations>(this.apiUrl, entity);
    }
}

