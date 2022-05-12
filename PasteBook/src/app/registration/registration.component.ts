import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUserRegistrations } from './Model/userregistrations';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  newUser: IUserRegistrations = {
    EmailAddress: "sadadada",
    Password: "asdasdas",
    FirstName: "asdasdasd",
    LastName: "dfdscxzcsd",
    Birthday: "dsjfjhugfisd",
    Gender: "female",
    MobileNumber: "0921334348"
  };

  
  userregistration$: Observable<IUserRegistrations[]> | undefined;

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
    
  }
  addNewUser() {
    // this.userfriendService.addFriend(this.userfriend);
    // console.log(this.userfriend);
    this.registrationService.addUser(this.newUser).subscribe(newUser => this.newUser = newUser);
    console.log("Success!");
  }

}
