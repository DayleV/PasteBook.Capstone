import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUsers } from 'src/app/user/Model/users';
import { UserService } from 'src/app/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserAuth } from 'src/app/security/Model/user-auth';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-edit-profile-information',
  templateUrl: './edit-profile-information.component.html',
  styleUrls: ['./edit-profile-information.component.scss']
})
export class EditProfileInformationComponent implements OnInit {

  loggedInUser: UserAuth ={};

  constructor(private userService: UserService, private router: ActivatedRoute, private authService: AuthService) { }

  editUser = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl(''),
  birthDate: new FormControl(''),
  gender: new FormControl(''),
  mobileNumber: new FormControl('')
  });
  message: boolean = false;

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser()!;

    this.userService.getUserToBeUpdated(this.loggedInUser.userId).subscribe((result)=>{
      this.editUser=new FormGroup( {
        userId: new FormControl( result['userId']),
        authenticationId: new FormControl( result['authenticationId']),
        firstName: new FormControl( result['firstName']  ),
        lastName: new FormControl( result['lastName']  ),
        birthDate: new FormControl( result['birthDate'] ),
        gender: new FormControl( result['gender']  ),
        mobileNumber: new FormControl( result['mobileNumber']  )
      } );
      });
    }
    UpdateData() {
      this.userService.UpdateUserProfile( this.loggedInUser.userId, this.editUser.value ).subscribe( ( result ) => {
        this.message=true;
      } )
    }
    removeMessage() {
      this.message=false;
    }
}
