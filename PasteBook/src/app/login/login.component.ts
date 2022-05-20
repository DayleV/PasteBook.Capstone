import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../security/auth.service';
import { Login } from './Model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  text: string = '';
  isChecker: boolean = false;

  login: Login = {
    emailAddress: "",
    password: ""
  }

  loginform = new FormGroup(
    {
    emailAddress: new FormControl('', [
      Validators.required,
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
    this.isChecker = true;
    this.login = this.loginform.value;
    this.authService.login(this.login)
    .pipe()
    .subscribe(response => {
      if(response.token)
        this.router.navigateByUrl('/');
    }, (error: HttpErrorResponse) => {
      if(error.status == 401){
        this.text = "User does not exist";
        this.router.navigateByUrl('/login');
      }
  });
  }
}
