import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './registration/registration.component';
import { PostComponent } from './post/post.component';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
import { ViewAlbumComponent } from './new-album/view-album/view-album.component';
import { AddAlbumComponent } from './new-album/add-album/add-album.component';
=======
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UserFriendComponent } from './user-friend/user-friend.component';
>>>>>>> 5fd2c14639dc5adc50bdff85243f9949f859b163

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    PostComponent,
<<<<<<< HEAD
    ViewAlbumComponent,
    AddAlbumComponent
=======
    LoginComponent,
    UserFriendComponent
>>>>>>> 5fd2c14639dc5adc50bdff85243f9949f859b163
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
