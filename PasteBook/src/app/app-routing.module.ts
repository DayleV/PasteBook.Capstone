import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserfriendComponent } from './userfriend/userfriend.component';

const routes: Routes = [
  {path: 'users', component: UserComponent},
  {path: 'userfriends', component: UserfriendComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
