import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: string,
  name: string,
  email: string,
  password: string,
  status: string,
  dateReg: Date,
  dateLog: Date
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = 'http://localhost:5000/api';
  token = 'auth_token';
  _currentUserId: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(name: string, email: string, password: string) {
    return this.http.post(this.uri + '/signup', { name: name, email: email, password: password });
  }

  login(email: string, password: string) {
    return this.http.post(this.uri + '/authenticate', { email: email, password: password }, { observe: 'response' });
  }

  logout() {
    localStorage.removeItem(this.token);
    this._currentUserId = null;
    console.log('You are logout');
  }


  addToken(res: any) {
    localStorage.setItem(this.token, res.body.token);
  }

  public get IsLogin(): boolean {
    return (localStorage.getItem(this.token) !== null);
  }


  users() {
    return this.http.get<User[]>(this.uri + '/users');
  }

  updateUsers(users: any) {
    return this.http.patch(this.uri + '/users', { users: users });
  }


  delete(id: string) {
    this.http.delete(this.uri + `/users/${id}`).subscribe(res => {
      console.log(res);
    });
    if (id == this._currentUserId) {
      this.logout();
      this.router.navigate(['login']);
    }
  }

  block(id: string) {
    this.http.patch(this.uri + `/users/${id}`, { status: 'block' }).subscribe(res => {
      console.log(res);
    });
    if (id == this._currentUserId) {
      this.logout();
      this.router.navigate(['login']);
    }
  }

  unblock(id: string) {
    this.http.patch(this.uri + `/users/${id}`, { status: 'good' }).subscribe(res => {
      console.log(res);
    });
  }

  public get currentUserId() {
    return this._currentUserId;
  }

  public set currentUserId(res: any) {
    this._currentUserId = res.body.signed_user.id;
  }


}
