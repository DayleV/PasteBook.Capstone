import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { IUserRegistrations } from './Model/userregistrations';
import { ConfigurationService } from '../configuration/configuration.service';
import { FormGroup } from '@angular/forms';

const API_ENDPOINT = "register";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  apiUrl: string = "";

  constructor(private http: HttpClient, 
    private configService: ConfigurationService) {

      this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;
      console.log(this.apiUrl);

    }

    addUser(entity: IUserRegistrations): Observable<IUserRegistrations> {
      return this.http.post<IUserRegistrations>(this.apiUrl, entity);
    }
}

