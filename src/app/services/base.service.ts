import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REQUEST, API_URL } from '../app.endpoints';
import { Observable } from 'rxjs';

export interface Post {
  id: string;
  title: string;
  author: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  body: string;
  postId: string;
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${API_URL}${REQUEST.GET_POSTS}`);
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${API_URL}${REQUEST.GET_COMMENTS}`);
  }

  getCommentByPostId(id): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${API_URL}${REQUEST.GET_COMMENTS}?postId=${id}`);
  }
}
