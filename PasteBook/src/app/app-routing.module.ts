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
  {
    path: 'users', component: UserComponent, 
    canActivate:[AuthenticatedGuard]
  },
  {
    path: ':string/albums', component: ViewAlbumComponent, 
    canActivate:[AuthenticatedGuard]
  },
  {
    path: 'add-album', component: AddAlbumComponent, 
    canActivate:[AuthenticatedGuard]
  },
  {
    path: ':string/albums/:id', component: SelectedAlbumComponent, 
    canActivate:[AuthenticatedGuard]
  },
  {
    path: 'friends', component: UserFriendComponent, 
    canActivate:[AuthenticatedGuard]
  },
  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: 'settings/profile', component: EditProfileInformationComponent, 
    canActivate:[AuthenticatedGuard]
  },
  {
    path: 'friends', component: UserFriendComponent, 
    canActivate:[AuthenticatedGuard]
  },
  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: 'posts/:id', component: PostComponent, 
    canActivate:[AuthenticatedGuard]
  },
  {
    path: 'users/:string', component: ProfileComponent, 
    canActivate:[AuthenticatedGuard]
  },
  {
    path: 'settings', component: SettingComponent, 
    canActivate:[AuthenticatedGuard]
  },
  {
    path: 'settings/changeEmail', component: ChangeEmailComponent, 
    canActivate:[AuthenticatedGuard]
  },
  {
    path: 'settings/changePassword', component: ChangePasswordComponent, 
    canActivate:[AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class AppRoutingModule { }
