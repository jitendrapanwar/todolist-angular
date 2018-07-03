import { Component, OnInit } from '@angular/core';
import { BaseService, Post, Comment } from './services/base.service';
import { takeUntil } from "rxjs/operators";
import { Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  posts=[];
  comments=[];
  errorMessage:string;

  private destroy$: Subject<null> = new Subject<null>();

  constructor(private bs:BaseService) {}

  ngOnInit(): void {
    this.bs.getPosts().pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.posts = data as any;
    }, err => this.errorMessage = err.message)
  } 

  getComments(post:Post) {
    const { id } = post;
   
    this.bs.getCommentByPostId(id).pipe(
      takeUntil(this.destroy$),
    ).subscribe((comment:Comment) => {
      this.comments = comment as any;
    }, err => this.errorMessage = err.message);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
