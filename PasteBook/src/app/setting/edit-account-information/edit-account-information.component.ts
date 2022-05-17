import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/security/auth.service';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { EditAccountInformationService } from './edit-account-information.service';
import { IUpdateCredentials } from './Model/accountinformation';

@Component({
  selector: 'app-edit-account-information',
  templateUrl: './edit-account-information.component.html',
  styleUrls: ['./edit-account-information.component.scss']
})
export class EditAccountInformationComponent implements OnInit {

  userCredentials: IUpdateCredentials = {
    userId: 0,
    emailAddress: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  }

  loggedInUser: UserAuth = {};

  constructor(private editAccountInformationService: EditAccountInformationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser()!;
    this.userCredentials.userId = this.loggedInUser.userId!;
    this.updateCredentials.controls['userId'].setValue(this.userCredentials.userId)
  }

  updateCredentials = new FormGroup(
    {
      userId: new FormControl(''),
      emailAddress: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/g)
    ]),
      oldPassword: new FormControl('', [
      Validators.required,
    ]),
      newPassword: new FormControl('', [
      Validators.required,
    ]),
      confirmNewPassword: new FormControl('', [
      Validators.required,
    ]),
  },);

  @Output() customSubmit = new EventEmitter();

  onSubmit(){
    this.customSubmit.emit(this.updateCredentials.value);
  }

  get userId(){
    return this.updateCredentials.get('userId');
  }

  get emailAddress(){
    return this.updateCredentials.get('emailAddress')
  }

  get oldPassword(){
    return this.updateCredentials.get('oldPassword')
  }

  get newPassword(){
    return this.updateCredentials.get('newPassword')
  }

  //To Update User Credentials
  updateAccountInformatiom(){
    this.userCredentials = this.updateCredentials.value;
    this.editAccountInformationService.updateUserCredentials(this.userCredentials).subscribe(userCredentials => this.userCredentials = userCredentials);
    this.updateCredentials.controls['oldPassword'].reset();
    this.updateCredentials.controls['newPassword'].reset();
    this.updateCredentials.controls['confirmNewPassword'].reset();
   }
}
