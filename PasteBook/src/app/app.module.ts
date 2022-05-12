import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './registration/registration.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UserFriendComponent } from './user-friend/user-friend.component';
import { ViewAlbumComponent } from './new-album/view-album/view-album.component';
import { AddAlbumComponent } from './new-album/add-album/add-album.component';
import { PhotosComponent } from './new-album/view-album/photos/photos.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    PostComponent,
    ViewAlbumComponent,
    AddAlbumComponent,
    LoginComponent,
    UserFriendComponent,
    PhotosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
