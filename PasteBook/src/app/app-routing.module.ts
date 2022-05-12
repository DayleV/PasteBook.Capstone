import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAlbumComponent } from './new-album/add-album/add-album.component';
import { ViewAlbumComponent } from './new-album/view-album/view-album.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommentComponent } from './post/comment/comment.component';
import { LikeComponent } from './post/like/like.component';
import { UserComponent } from './user/user.component';
import { UserFriendComponent } from './user-friend/user-friend.component';
import { PhotosComponent } from './new-album/view-album/photos/photos.component';

const routes: Routes = [
  {path: 'users', component: UserComponent},
  {path: 'view-albums', component: ViewAlbumComponent},
  {path: 'add-album', component: AddAlbumComponent},
  {path: 'view-albums/:id', component: PhotosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'friends', component: UserFriendComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'posts', component: PostComponent},
  {path: 'posts/comments', component: CommentComponent},
  {path: 'posts/likes', component: LikeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
