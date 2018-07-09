import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseService} from './services/base.service';
import {flatMap} from 'rxjs/operators';
import {from, Subscription} from 'rxjs';
import {tap} from 'rxjs/internal/operators';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  posts: Array<any> = [];
  errorMessage: string;
  postsSubscription: Subscription;
  combind$;
  constructor(private bs: BaseService) {}

  ngOnInit(): void {
    this.bs.getPosts().pipe(
      flatMap((posts) => {
        return from(posts);
     }),
      flatMap((post) => {
        return this.bs.getCommentByPostId(post.id).pipe(
          tap((comments) => {
            post.comments = comments;
            this.posts.push(post);
          })
        );
      })
    ).subscribe((posts) => {
      console.log(posts);
    });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
