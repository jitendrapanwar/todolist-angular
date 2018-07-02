import { Component, OnInit } from '@angular/core';
import { BaseService } from './services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  posts=[];
  constructor(private bs:BaseService) {
    
  }
  ngOnInit(): void {
    this.bs.getPosts().subscribe(data => {
      console.log(data);
      this.posts.push(data);
      console.log(typeof data); // query here:  returning object instead of array of objects
    })

    this.bs.getComments().subscribe(data => {
      console.log("comments : ", data);
    }); 

    this.bs.getProfile().subscribe(data => {
      console.log("profile data: ",data);
    });

    // to test observable chaning...
    this.getCommentByPostId();
  } 

  getCommentByPostId() {
    // observable chaining...
    // just try to make it by passing hardcoded postId as of now.
    this.bs.getPosts()
      .subscribe(data => this.bs.getCommentByPostId(1)
      .subscribe(data => console.log("getCommentByPostId: ", data))
    )
  }
}
