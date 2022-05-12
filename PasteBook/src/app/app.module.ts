import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { CommentComponent } from './post/comment/comment.component';
import { LikeComponent } from './post/like/like.component';
import { RegistrationComponent } from './registration/registration.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { UserFriendComponent } from './user-friend/user-friend.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ViewAlbumComponent } from './new-album/view-album/view-album.component';
import { AddAlbumComponent } from './new-album/add-album/add-album.component';
import { PhotosComponent } from './new-album/view-album/photos/photos.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PostComponent,
    CommentComponent,
    LikeComponent,
    RegistrationComponent,
    PostComponent,
    ViewAlbumComponent,
    AddAlbumComponent,
    UserFriendComponent,
    UserRegistrationComponent,
    LoginComponent,
    UserFriendComponent,
    PhotosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    // FlexLayoutModule,
    FormsModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
