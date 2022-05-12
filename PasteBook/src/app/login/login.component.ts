import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../security/auth.service';
import { UserAuthBase } from '../security/Model/user-auth-base';
import { Login } from './Model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login = {
    emailAddress: '',
    password: ''
  }

  response!: UserAuthBase;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.authService.login(this.login).subscribe(response => this.response = response);
  }
}
