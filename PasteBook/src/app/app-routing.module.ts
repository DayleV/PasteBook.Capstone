import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { UserfriendComponent } from './userfriend/userfriend.component';

const routes: Routes = [
  {path: 'users', component: UserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'userfriends', component: UserfriendComponent},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
