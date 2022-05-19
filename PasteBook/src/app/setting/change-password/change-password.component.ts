import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { ChangeaccountinfoService } from '../changeaccountinfo.service';
import { IUpdateUserPassword, IUpdateUserPasswordRequestData } from './Model/update_password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  updatePasswordData: IUpdateUserPassword ={
    userId: 0,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  }

  updatePasswordRequestData: IUpdateUserPasswordRequestData= {
    userId: 0,
    oldPassword: "",
    newPassword: ""
  }

  loggedInUser: UserAuth = {};

  constructor(private changeAccountInfoService: ChangeaccountinfoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser()!;
    this.updatePasswordData.userId = this.loggedInUser.userId!;
    this.updatePasswordRequestData.userId = this.loggedInUser.userId!;
  }

  updatePasswordForm = new FormGroup(
    {
      userId: new FormControl(''),
      oldPassword: new FormControl('', [
        Validators.required
      ]),
      newPassword: new FormControl('', [
        Validators.required
      ]),
      confirmNewPassword: new FormControl('', [
        Validators.required
      ])
    },);
  
  @Output() customSubmit = new EventEmitter();

  onSubmit(){
    this.customSubmit.emit(this.updatePasswordForm.value);
  }

  get userId(){
    return this.updatePasswordForm.get('userId');
  }

  get oldPassword(){
    return this.updatePasswordForm.get('oldPassword');
  }

  get newPassword(){
    return this.updatePasswordForm.get('newPassword');
  }

  get confirmNewPassword(){
    return this.updatePasswordForm.get('confirmNewPassword');
  }

  updateUserEmail(){
    this.updatePasswordRequestData.oldPassword = this.updatePasswordData.oldPassword;
    this.updatePasswordRequestData.newPassword = this.updatePasswordData.newPassword;
    this.changeAccountInfoService.updateUserPassword(this.updatePasswordRequestData).subscribe(response => console.log(response));
  }
}
