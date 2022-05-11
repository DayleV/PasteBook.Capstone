import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUsers } from './Model/users';
import { ConfigurationService } from '../configuration/configuration.service';

const API_ENDPOINT = "users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = "";

  constructor(private http: HttpClient, 
    private configService: ConfigurationService) {

      this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;
      console.log(this.apiUrl);

    }

  getUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.apiUrl);
  }

}

///samples of CRUD
// addProduct(entity: Product): Observable<Product> {
//   return this.http.post<Product>(this.apiUrl, entity,
//     httpOptions).pipe(
//       catchError(this.handleError<Product>('addProduct',
//         'Error inserting a new product: '
//         + JSON.stringify(entity),
//         entity))
//     );
// }

// updateProduct(entity: Product): Observable<any> {
//   return this.http.put(this.apiUrl + entity.productId.toString(), entity, httpOptions).pipe(
//     catchError(this.handleError<any>('updateProduct',
//       'Error updating product: ' + JSON.stringify(entity),
//       entity))
//   );
// }

// deleteProduct(id: number): Observable<Product> {
//   return this.http.delete<Product>(this.apiUrl + id.toString(),
//     httpOptions).pipe(
//       catchError(this.handleError<Product>('deleteProduct',
//         'Error deleting product: ' + id.toString()))
//     );
// }
