import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REQUEST, API_URL } from '../app.endpoints';

interface Post {
  "id": string,
  "title": string,
  "author": string
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http:HttpClient) { }
 
  getPostById(id) {
    return this.http.get<Post>(`${API_URL}${REQUEST.GET_POSTS}/${id}`)
  }
  getPosts() {
    return this.http.get<Post>(`${API_URL}${REQUEST.GET_POSTS}`)
  }

  getComments() {
    return this.http.get(`${API_URL}${REQUEST.GET_COMMENTS}`)  
  }
  
  getCommentByPostId(id) {
    return this.http.get(`${API_URL}${REQUEST.GET_COMMENTS}?postId=${id}`)  
  }

  getProfile() {
    return this.http.get(`${API_URL}${REQUEST.GET_PROFILE}`)
  }

}
