import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { IUserRegistrations } from './Model/userregistrations';
import { RegistrationService } from './registration.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  text: string = '';
  isTrue: boolean = true;

  newUser: IUserRegistrations = {
    EmailAddress: "",
    Password: "",
    ConfirmPassword: "",
    FirstName: "",
    LastName: "",
    Birthdate: "",
    Gender: "",
    MobileNumber: ""
  }

  constructor(private registrationService: RegistrationService, private router: Router) {}

  registrationform = new FormGroup(
    {
    EmailAddress: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ]),
      Password: new FormControl('', [
      Validators.required,
    ]),
    ConfirmPassword: new FormControl('', [
      Validators.required,
    ]),
    FirstName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[A-Za-z ]+$/)
    ]),
    LastName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z ]+$/)
    ]),
    Birthdate: new FormControl('', [
      Validators.required
    ]),
    Gender: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z ]+$/)
    ]),
    MobileNumber: new FormControl('', [
      Validators.pattern(/^09[0-9]{9}$/g)
    ]), 
  },
  
  );
  @Output() customSubmit = new EventEmitter();

  onSubmit() {
    this.customSubmit.emit(this.registrationform.value);
  }

  get EmailAddress() {
    return this.registrationform.get('EmailAddress');
  }

  get Password() {
    return this.registrationform.get('Password');
  }
  
  get ConfirmPassword() {
    return this.registrationform.get('ConfirmPassword');
  }

  get FirstName() {
    return this.registrationform.get('FirstName');
  }
  
  get LastName() {
    return this.registrationform.get('LastName');
  }
  
  get Birthdate() {
    return this.registrationform.get('Birthdate');
  }
  
  get Gender() {
    return this.registrationform.get('Gender');
  }
  
  get MobileNumber() {
    return this.registrationform.get('MobileNumber');
  }

  checker(): void {
    this.newUser = this.registrationform.value;
    if(this.newUser.Password != this.newUser.ConfirmPassword){
      return console.error('Wrong Password');
    }
    else{
      this.addNewUser();
    }
  }
  ngOnInit(): void {  }

  addNewUser(): void {
    if (this.registrationform.valid){
      // this.userfriendService.addFriend(this.userfriend);
    // console.log(this.userfriend);
    this.newUser = this.registrationform.value;
    this.registrationService.addUser(this.newUser).subscribe(newUser => 
      {this.newUser = newUser
        alert("Registration Succesful")
        //this.text = "Registration Succesful"
        this.router.navigateByUrl('/');
        this.registrationform.reset();
    },
       (error: HttpErrorResponse) => {
        if(error.status == 400){
          //alert("Email already existed")
          this.text = "Email already existed"
          //this.router.navigateByUrl('/registration');
        }
    });
  }
    else {
      //alert("Registration Succesful")
      this.text = "Invalid Credentials"
      //this.router.navigateByUrl('/registration');
    }
    
  }
}
