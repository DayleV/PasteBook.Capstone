import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommentComponent } from './post/comment/comment.component';
import { LikeComponent } from './post/like/like.component';
import { PostComponent } from './post/post.component';
import { UserComponent } from './user/user.component';
import { UserFriendComponent } from './user-friend/user-friend.component';

const routes: Routes = [
  {path: 'users', component: UserComponent},
  {path: 'user-friends', component: UserFriendComponent},
  {path: 'user-registration', component: UserRegistrationComponent},
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
