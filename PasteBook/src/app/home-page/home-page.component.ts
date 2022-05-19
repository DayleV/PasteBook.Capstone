import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { UserAuth } from '../security/Model/user-auth';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private authService: AuthService) { }
  user: UserAuth = {};
  
  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser()!;
  }

}
