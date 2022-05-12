import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAlbumComponent } from './new-album/add-album/add-album.component';
import { ViewAlbumComponent } from './new-album/view-album/view-album.component';
import { PostComponent } from './post/post.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { UserfriendComponent } from './userfriend/userfriend.component';

const routes: Routes = [
  {path: 'users', component: UserComponent},
  {path: 'userfriends', component: UserfriendComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'view-albums', component: ViewAlbumComponent},
  {path: 'add-album', component: AddAlbumComponent},
  {path: 'posts', component: PostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
