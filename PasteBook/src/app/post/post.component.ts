import { Component, Input, NgModule, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, pipe, tap } from 'rxjs';
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

  posts$: Observable<IPosts[]> | any;

  constructor(private postService: PostService) {
    this.postText = [];
  }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts(); 
  }

}
