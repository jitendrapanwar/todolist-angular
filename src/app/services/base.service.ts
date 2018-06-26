import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  API_URL = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  getPosts() {
    return this.http.get(`${this.API_URL}/posts`)
  }

  getComments() {
    return this.http.get(`${this.API_URL}/comments`)
  }

  getProfile() {
    return this.http.get(`${this.API_URL}/profile`)
  }

}
