import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private API_URL = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  getPosts(endPoint) {
    return this.http.get(`${this.API_URL}${endPoint}`)
  }

  getComments(endPoint) {
    return this.http.get(`${this.API_URL}${endPoint}`)
  }

  getProfile(endPoint) {
    return this.http.get(`${this.API_URL}${endPoint}`)
  }

}
