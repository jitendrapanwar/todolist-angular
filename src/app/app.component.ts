import { Component, OnInit } from '@angular/core';
import { BaseService } from './services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  
  constructor(private bs:BaseService) {
    
  }
  ngOnInit(): void {
     this.bs.getPosts('/posts').subscribe(data => {
        console.log(data);
      });

      this.bs.getComments('/comments').subscribe(data => {
        console.log(data);
      });

      this.bs.getProfile('/profile').subscribe(data => {
        console.log(data);
      });
    }
}
