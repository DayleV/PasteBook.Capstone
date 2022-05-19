import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { ChangeaccountinfoService } from '../changeaccountinfo.service';
import { IUpdateUserEmail, IUpdateUserEmailRequest } from './Model/update_email';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  updateEmailData: IUpdateUserEmail ={
    userId: 0,
    oldEmailAddress: "",
    newEmailAddress: "",
    confirmNewEmailAddress: "",
    oldPassword: ""
  }

  updateEmailRequestData: IUpdateUserEmailRequest= {
    userId: 0,
    emailAddress: "",
    oldPassword: ""
  }

  loggedInUser: UserAuth = {};

  constructor(private changeAccountInfoService: ChangeaccountinfoService, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser()!;
    this.updateEmailData.userId = this.loggedInUser.userId!;
    this.updateEmailRequestData.userId = this.loggedInUser.userId!;
  }

  updateEmailForm = new FormGroup(
    {
      userId: new FormControl(''),
      oldEmailAddress: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/g)
      ]),
      newEmailAddress: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/g)
      ]),
      confirmNewEmailAddress: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/g)
      ]),
      oldPassword: new FormControl('', [
        Validators.required
      ])
    },);
  
  @Output() customSubmit = new EventEmitter();

  onSubmit(){
    this.customSubmit.emit(this.updateEmailForm.value);
  }

  get userId(){
    return this.updateEmailForm.get('userId');
  }

  get oldEmailAddress(){
    return this.updateEmailForm.get('oldEmailAddress');
  }

  get newEmailAddress(){
    return this.updateEmailForm.get('newEmailAddress');
  }

  get confirmNewEmailAddress(){
    return this.updateEmailForm.get('confirmNewEmailAddress');
  }

  get oldPassword(){
    return this.updateEmailForm.get('oldPassword');
  }

  updateUserEmail(){
    this.updateEmailRequestData.emailAddress = this.updateEmailData.newEmailAddress;
    this.updateEmailRequestData.oldPassword = this.updateEmailData.oldPassword;
    this.changeAccountInfoService.updateUserEmail(this.updateEmailRequestData).subscribe(response => console.log(response));
  }

  cancel() {
    this.ngOnInit();
    this.route.navigate([`/settings`]);
  }

}
