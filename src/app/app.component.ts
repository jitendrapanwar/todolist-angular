import { Component, OnInit } from '@angular/core';
import { BaseService, Post, Comment } from './services/base.service';
import { flatMap, filter } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  posts=[];
  comments=[];
  errorMessage:string;
  
  constructor(private bs:BaseService) {}

  ngOnInit(): void {
    this.bs.getPosts().subscribe(data => {
        this.posts = data as any
    })
  } 

  getPostData(post:Post) {
    const { id } = post;
    this.comments =[];

    this.bs.getComments().pipe(
      flatMap(data => data as any),
      filter((data:Comment) => data.postId === id)
    ).subscribe(response => {
        this.comments.push(response);
    }, err => this.errorMessage = err.message)
  }
}
