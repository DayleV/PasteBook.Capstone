import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './registration/registration.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { UserFriendComponent } from './user-friend/user-friend.component';
import { ViewAlbumComponent } from './album/view-album/view-album.component';
import { AddAlbumComponent } from './album/add-album/add-album.component';
import { SelectedAlbumComponent } from './album/view-album/selected-album/selected-album.component';
import { PhotoComponent } from './album/view-album/selected-album/photo/photo.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ProfileComponent } from './profile/profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NewsfeedComponent } from './home-page/newsfeed/newsfeed.component';
import { SettingComponent } from './setting/setting.component';
import { EditProfileInformationComponent } from './setting/edit-profile-information/edit-profile-information.component';
import { EditAccountInformationComponent } from './setting/edit-account-information/edit-account-information.component';
import { NotificationComponent } from './navigation-bar/notification/notification.component';
import { ProfileAlbumComponent } from './profile/profile-album/profile-album.component';
import { ProfileFriendComponent } from './profile/profile-friend/profile-friend.component';
import { ProfilePostComponent } from './profile/profile-post/profile-post.component';
import { ProfileBlurbComponent } from './profile/profile-blurb/profile-blurb.component';
import { ChangeEmailComponent } from './setting/change-email/change-email.component';
import { ChangePasswordComponent } from './setting/change-password/change-password.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeFriendComponent } from './home-page/home-friend/home-friend.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PostComponent,
    ViewAlbumComponent,
    AddAlbumComponent,
    LoginComponent,
    UserFriendComponent,
    SelectedAlbumComponent,
    PhotoComponent,
    RegistrationComponent,
    ProfileComponent,
    HomePageComponent,
    NavigationBarComponent,
    NewsfeedComponent,
    SettingComponent,
    EditProfileInformationComponent,
    EditAccountInformationComponent,
    NotificationComponent,
    ProfileAlbumComponent,
    ProfileFriendComponent,
    ProfilePostComponent,
    ProfileBlurbComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    HomeFriendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    InfiniteScrollModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
