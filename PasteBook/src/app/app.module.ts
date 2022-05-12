import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserfriendComponent } from './userfriend/userfriend.component';
import { RegistrationComponent } from './registration/registration.component';
import { PostComponent } from './post/post.component';
import { FormsModule } from '@angular/forms';
import { ViewAlbumComponent } from './new-album/view-album/view-album.component';
import { AddAlbumComponent } from './new-album/add-album/add-album.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserfriendComponent,
    RegistrationComponent,
    PostComponent,
    ViewAlbumComponent,
    AddAlbumComponent
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
