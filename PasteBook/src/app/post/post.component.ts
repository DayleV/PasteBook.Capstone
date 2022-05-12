import { Component, Input, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { IPosts } from './Model/posts';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  newPost: IPosts = {
    UserId: 2,
    PostContent: ''
  };

  postText: any[];

  posts$: Observable<IPosts[]> | undefined;

  constructor(private postService: PostService) {
    this.postText = [];
  }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts(); 
  }

<<<<<<< HEAD
  addPost(): void{
    const data = {
      UserId : this.post.UserId,
      PostContent: this.post.PostContent
    };
    this.postService.addPost(this.post).subscribe(post => this.post == post);
=======
  postOnClick(): void{
    const data = {
      UserId : this.newPost.UserId,
      PostContent: this.newPost.PostContent
    };
    this.postService.addPosts(this.newPost).subscribe(newPost => this.newPost == newPost);
    console.log(this.newPost);
  }

  onSubmit(f: NgForm): void{
    let renderPost = f.value.renderPost;
    this.postText.push({
      'renderPost': renderPost
    })
>>>>>>> 6def3ff7a18334747ea7309275b0e54829d956a4
  }
}
