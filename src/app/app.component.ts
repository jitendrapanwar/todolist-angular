import { Component, OnInit } from '@angular/core';
import { BaseService } from './services/base.service';
import { takeUntil, catchError } from "rxjs/operators";
import { Observable, Subject, forkJoin} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Array<any>;
  errorMessage: string;
  posts$: Observable<any>;
  comments$: Observable<any>;

  private destroy$: Subject<null> = new Subject<null>();

  constructor(private bs:BaseService) {}

  ngOnInit(): void {
    
    this.posts$ = this.bs.getPosts().pipe(
      takeUntil(this.destroy$),
    );

    this.comments$ = this.bs.getComments().pipe(
      takeUntil(this.destroy$)
    );

    forkJoin([this.posts$, this.comments$]).pipe(
      takeUntil(this.destroy$),
    ).subscribe((results) => {
      this.posts = this.buildPostsData(results)
    }, (err) => this.errorMessage = err.message);
  }
  
  buildPostsData(results) {
    const [posts, comments] = results;
    
    return posts.map(({...post}) => {
      return comments.reduce((accumulator, comment) => {
        accumulator = post;
        accumulator.comments = accumulator.comments || []; 
        if(accumulator.id === comment.postId) {
          accumulator.comments.push(comment);
        }
        return accumulator;
      },[]);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
