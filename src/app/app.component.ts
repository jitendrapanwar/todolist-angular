import { Component, OnInit } from '@angular/core';
import { BaseService, Post, Comment } from './services/base.service';
import { flatMap } from "rxjs/operators";

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
    }, err => this.errorMessage = err.message)
  } 

  getComments(post:Post) {
    const { id } = post;
    this.comments =[];

    this.bs.getCommentByPostId(id).pipe(
      flatMap(data => data as any),
    ).subscribe((comment:Comment) => {
        this.comments.push(comment);
    }, err => this.errorMessage = err.message);
  }
}
