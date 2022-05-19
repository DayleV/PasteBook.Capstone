import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAlbumComponent } from './album/add-album/add-album.component';
import { ViewAlbumComponent } from './album/view-album/view-album.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { UserFriendComponent } from './user-friend/user-friend.component';
import { SelectedAlbumComponent } from './album/view-album/selected-album/selected-album.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthenticatedGuard } from './security/guard/authenticated.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './security/interceptor/auth.interceptor';
import { LoginGuard } from './security/guard/login.guard';
import { EditProfileInformationComponent } from './setting/edit-profile-information/edit-profile-information.component';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangeEmailComponent } from './setting/change-email/change-email.component';
import { ChangePasswordComponent } from './setting/change-password/change-password.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent, 
    canActivate:[AuthenticatedGuard], 
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent, 
    canActivate:[LoginGuard]
  },
  {path: 'users', component: UserComponent},
  {path: ':string/albums', component: ViewAlbumComponent},
  {path: 'add-album', component: AddAlbumComponent},
  {path: ':string/albums/:id', component: SelectedAlbumComponent},
  {path: 'friends', component: UserFriendComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'settings/profile', component: EditProfileInformationComponent},
  {path: 'friends', component: UserFriendComponent},
  {path: 'registration', component: RegistrationComponent},
  {
    path: 'posts/:id', component: PostComponent
  },
  {path: 'users/:string', component: ProfileComponent},
  {path: 'settings', component: SettingComponent},
  {path: 'settings/changeemail', component: ChangeEmailComponent},
  {path: 'settings/changepass', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class AppRoutingModule { }
