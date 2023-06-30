import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http : HttpClient) { }

  // create function to add user

  public adduser(user:any) {
    return this.http.post(`${baseUrl}/user/`,user);
  }

  public getUserByUsername(username:any) {
    return this.http.get(`${baseUrl}/user/${username}`);
  }
}
