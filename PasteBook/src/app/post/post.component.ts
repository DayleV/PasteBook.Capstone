import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from './Model/posts';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from './post.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {

  todayDate : Date = new Date();
  
  post: IPost = {
    PostId: 1,
    UserId: 1,
    PostContent: 'PostContent',
    PostDate: this.todayDate 
  }
  post$: Observable<IPost[]> | undefined;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.post$ = this.postService.getAllPost();
  }

  addNewPost() {
    this.postService.addPost(this.post).subscribe(post => this.post == post);
    console.log("success");
  }

}
