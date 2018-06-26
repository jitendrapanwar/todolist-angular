import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REQUEST, API_URL } from '../app.endpoints';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http:HttpClient) { }

  getPosts() {
    return this.http.get(`${API_URL}${REQUEST.GET_POSTS}`)
  }

  getComments() {
    return this.http.get(`${API_URL}${REQUEST.GET_COMMENTS}`)
  }

  getProfile() {
    return this.http.get(`${API_URL}${REQUEST.GET_PROFILE}`)
  }

}
