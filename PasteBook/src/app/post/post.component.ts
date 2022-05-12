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
  
  post: IPost = {
    UserId: 2,
    PostContent: '',
  }
  post$: Observable<IPost[]> | undefined;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.post$ = this.postService.getAllPost();
  }

  addPost(): void{
    const data = {
      UserId : this.post.UserId,
      PostContent: this.post.PostContent
    };
    this.postService.addPost(this.post).subscribe(post => this.post == post);
  }
}
