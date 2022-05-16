import { Component, Input, NgModule, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, pipe, tap } from 'rxjs';
import { IPost, IPostDetail, IPosts } from './Model/posts';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postDetail$!: Observable<IPostDetail>;
  id! :string;

  constructor(private postService: PostService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {       
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id')!;
      });
    this.postDetail$ = this.postService.getPostsById(this.id)
  }

}
