import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { catchError, EMPTY } from 'rxjs';
import { PostService } from '../post/post.service';
import { AuthService } from '../security/auth.service';
import { UserAuth } from '../security/Model/user-auth';
import { IProfileAlbum, IPost, IProfilePosts, IUsers, IUserFriend, IUser_Friends } from './model/profile';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserAuth = {};
  
  post: IPost = {
    UserId: this.user.userId,
    PostContent: ''
  }

  profileUser: Observable<IUsers> | undefined;
  allFriends!: Observable<IUser_Friends[]> | undefined;
  filterFriend: Observable<any> | undefined;

  posts$!: Observable<IProfilePosts[]>;
  albums$!: Observable<IProfileAlbum[]>;
  getAllRequest!: IUser_Friends[];

  users: IUsers | any = [];
  route: ActivatedRoute;
  id: any;
  checker: boolean = true;
  error: boolean = false;
  isEdit: boolean;

  constructor(route: ActivatedRoute, private profileService: ProfileService, 
    private router: Router, private postService: PostService, private authService: AuthService) {
      this.route = route;
      this.isEdit = false;
  }

  async ngOnInit() {
    this.user = this.authService.getLoggedInUser()!;
    this.posts$ = this.profileService.getPostsByUserId(Number(this.id));
    this.albums$ = this.profileService.getAlbumsByUserId(Number(this.id));

    var str = (String(this.route.snapshot.paramMap.get('string'))).match(/\d+/);
    this.id = str? str[0]: 0;
    
    this.profileService.getUserById(Number(this.id)).subscribe(users => {
    this.users = users;
    });

    this.posts$ = this.profileService.getPostsByUserId(Number(this.id));

    this.allFriends = this.profileService.getFriends();
    this.profileUser = this.profileService.getUserById(this.id);
    this.filterFriend = combineLatest([
      this.allFriends,
      this.profileUser
    ]).pipe(
      map(([allfriends, user]) => allfriends
        .filter(af => af.userId === Number(user.userId) && af.friendId === Number(this.user.userId) ||
         af.userId === Number(user.userId) && af.friendId === Number(this.user.userId)))
    );

    this.profileService.getAllRequest().subscribe(response => this.getAllRequest = response);

    if(this.id != this.user.userId){
          this.checker = false;
        }
  }

  addPost(): void {
    this.post.UserId = this.user.userId;
    console.log(this.post)
    this.profileService.addPosts(this.post).subscribe(post => this.post = post);
  }

  userFriend: IUser_Friends = {
    userId: this.user.userId,
    friendId: this.users.userId,
  }

  addUserFriend(): void {
    this.userFriend.userId = this.users.userId;
    this.userFriend.friendId = this.user.userId;
    this.userFriend.requesterId = this.user.userId;
    this.profileService.addUserFriendRequest(this.userFriend).subscribe(userFriend =>
      userFriend
    );

    this.userFriend.userId = this.user.userId;
    this.userFriend.friendId = this.users.userId,
    this.userFriend.requesterId = this.user.userId;
    this.profileService.addUserFriendRequest(this.userFriend).subscribe(userFriend => 
      this.ngOnInit()
    );
  }

  cancel(profileId: number | undefined, userId: number | undefined): void {
    for (let request of this.getAllRequest){
      if(request.friendId == profileId || request.friendId == userId){
        if(request.userId == profileId || request.userId == userId){
          this.profileService.DeleteUserFriendRequest(request.userFriendId).subscribe(userFriend => 
              this.ngOnInit()
          );
        }
      }
    }
  }

  acceptFriendRequest(id: number | undefined, friendId: number | undefined, userId: number | undefined): void {    
    this.userFriend.userFriendId = id,
    this.userFriend.userId = friendId;
    this.userFriend.friendId = userId,
    this.userFriend.status = true,
    this.profileService.update(id, this.userFriend).subscribe(userFriend => 
      {this.userFriend = userFriend
        
  });  
    for (let request of this.getAllRequest){
      if(request.friendId ==  userId){
        if(request.userId == friendId){
          this.userFriend.userFriendId = request.userFriendId,
          this.userFriend.userId = request.friendId;
          this.userFriend.friendId = request.userId,
          request.status = true;
          this.userFriend.status = request.status,
          this.profileService.update(request.userFriendId, this.userFriend).subscribe(userFriend => 
            {this.userFriend = userFriend
              this.ngOnInit(); 
          });
        }
      }
    }
  }

  unfriend(friendId: number | undefined, userId: number | undefined): void {
    for (let request of this.getAllRequest){
      if(request.friendId == friendId || request.friendId == userId){
        if(request.userId == friendId || request.userId == userId){
          this.profileService.DeleteUserFriendRequest(request.userFriendId).subscribe(userFriend => 
            this.ngOnInit()
            );
        }
      }
    }
  }

  editBlurb(): void {
    this.isEdit = true;
    this.ngOnInit();
  }

  saveBlurb(id: number | undefined){
    this.profileService.updateProfile(id, this.users).subscribe(user => this.users == user);
    this.isEdit = false;
    this.router.navigate([`users/${this.users.firstName! + this.users.lastName! + this.users.userId}`]);
    this.ngOnInit();
  }

  cancelBlurb(): void {
    this.isEdit = false;
    this.ngOnInit();
  }

}
