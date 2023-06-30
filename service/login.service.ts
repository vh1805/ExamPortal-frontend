import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubject  = new Subject<boolean>();

  constructor(private http : HttpClient) { }

  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  // generate token

  public generateToken(loginData : any) {
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  // login user : set token in local Storage
  public loginUser(token:any) {
    localStorage.setItem("token",token);
    return true;
  }

  // islogin : check whether user is login or Not

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');

    if(tokenStr == '' || tokenStr == null || tokenStr == undefined){
      return false;
    }
    else {
      return true;
    }
  }

  // logout : remove token from local Storage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get Token 
  public getToken() {
    return localStorage.getItem('token');
  }

  // set user detail in local Storage
  public setUser(user:any) {
    localStorage.setItem('user',JSON.stringify(user));

  }

  // get user 
  public getUser() {
    let userStr = localStorage.getItem('user');
    if(userStr!=null) {
      return JSON.parse(userStr);
    }
    else {
      this.logout();
      return null;
    }
  }

  // get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
