import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUsers } from 'src/app/user/Model/users';
import { UserService } from 'src/app/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { AuthService } from 'src/app/security/auth.service';
import { PhotoService } from 'src/app/album/view-album/selected-album/photo/photo.service';

@Component({
  selector: 'app-edit-profile-information',
  templateUrl: './edit-profile-information.component.html',
  styleUrls: ['./edit-profile-information.component.scss']
})
export class EditProfileInformationComponent implements OnInit {

  loggedInUser: UserAuth = {};
  selectedFile: File | null = null;
  serverResponse: string = '';

  constructor(private userService: UserService, private router: ActivatedRoute, private authService: AuthService, private photoService: PhotoService, private route: Router) { }

  editUser = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    birthDate: new FormControl(''),
    gender: new FormControl(''),
    mobileNumber: new FormControl(''),
    profilePicture: new FormControl(''),
    profileBlurb: new FormControl(''),
    userName: new FormControl('')
  });
  message: boolean = false;

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser()!;

    this.userService.getUserToBeUpdated(this.loggedInUser.userId).subscribe((result) => {
      this.editUser = new FormGroup({
        userId: new FormControl(result['userId']),
        authenticationId: new FormControl(result['authenticationId']),
        firstName: new FormControl(result['firstName']),
        lastName: new FormControl(result['lastName']),
        birthDate: new FormControl(result['birthDate']),
        gender: new FormControl(result['gender']),
        mobileNumber: new FormControl(result['mobileNumber']),
        profilePicture: new FormControl(result['profilePicture']),
        profileBlurb: new FormControl(result['profileBlurb']),
        userName: new FormControl(result['userName'])
      });
    });
  }
  UpdateData() {
    this.userService.UpdateUserProfile(this.loggedInUser.userId, this.editUser.value).subscribe((result) => {
      this.message = true;
    })
  }
  removeMessage() {
    this.message = false;
  }

  cancel() {
    this.ngOnInit();
    this.route.navigate([`/settings`]);
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    this.photoService.submitProfilePhoto(this.selectedFile!, this.loggedInUser.userId?.toString()).subscribe(response => this.serverResponse = response.toString());
    this.message = true;
  }


}