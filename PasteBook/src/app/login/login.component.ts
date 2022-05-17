import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../security/auth.service';
import { Login } from './Model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../fonts/material-design-iconic-font/css/material-design-iconic-font.min.css']
})
export class LoginComponent implements OnInit {

  login: Login = {
    emailAddress: "",
    password: ""
  }

  loginform = new FormGroup(
    {
    emailAddress: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/g)
    ]),
      password: new FormControl('', [
      Validators.required,
    ]),
  },
  
  );

  get emailAddress() {
    return this.loginform.get('emailAddress');
  }

  get password() {
    return this.loginform.get('password');
  }
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.login = this.loginform.value;
    this.authService.login(this.login)
    .pipe()
    .subscribe(response => {
      if(response.token)
        this.router.navigateByUrl('/');
    });
  }
}
