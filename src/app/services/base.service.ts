import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REQUEST, API_URL } from '../app.endpoints';

export interface Post {
  "id": string,
  "title": string,
  "author": string
}

export interface Comment {
  "id": string,
  "body": string,
  "postId": string
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http:HttpClient) { }
 
  getPosts() {
    return this.http.get<Post>(`${API_URL}${REQUEST.GET_POSTS}`)
  }

  getComments() {
    return this.http.get<Comment>(`${API_URL}${REQUEST.GET_COMMENTS}`)  
  }

  getCommentByPostId(id) {
    return this.http.get<Comment>(`${API_URL}${REQUEST.GET_COMMENTS}?postId=${id}`)  
  }
}
