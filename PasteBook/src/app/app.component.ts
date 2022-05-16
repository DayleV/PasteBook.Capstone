import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './security/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    if(this.authService.isLoggedIn()){
      this.authService.isLoggedIn$.next(true);
    }
  }
}
