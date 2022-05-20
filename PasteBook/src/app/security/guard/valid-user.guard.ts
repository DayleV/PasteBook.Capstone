import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/post/post.service';
import { AuthService } from '../auth.service';
import { UserAuth } from '../Model/user-auth';

@Injectable({
  providedIn: 'root'
})
export class ValidUserGuard implements CanActivate {

  id! :string;
  user: UserAuth = {};

  constructor(private authService: AuthService, private postService: PostService) {
    this.user = this.authService.getLoggedInUser()!;
   }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      this.id = route.paramMap.get('id')!;

      console.log(this.id);
      console.log(this.user.userId);
    
    return true;
  }
  
}
