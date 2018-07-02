import { Component, OnInit } from '@angular/core';
import { BaseService } from './services/base.service';
import { Observable, from } from "rxjs";
import { map, flatMap } from "rxjs/operators";

interface Post {
  "id": string,
  "title": string,
  "author": string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 posts=[];
  comments=[];
  constructor(private bs:BaseService) {
    
  }
  ngOnInit(): void {

    this.bs.getPosts()
      .subscribe(data => {
        this.posts = data as any
      })
   
    this.bs.getComments().subscribe(data => {
      //console.log("comments : ", data);
    }); 

    this.bs.getProfile().subscribe(data => {
     // console.log("profile data: ",data);
    });
  } 

  getPostData(post:Post) {
    const { id } = post;
    this.bs.getPostById(id).pipe(
      flatMap(post => this.bs.getCommentByPostId(post.id))
    )
    .subscribe(response => {
      this.comments = response as any;
    });
  }
}
