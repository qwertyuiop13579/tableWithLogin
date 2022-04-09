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

  constructor(private http: HttpClient, private router: Router) { }

  signup(name: string, email: string, password: string) {
    return this.http.post(this.uri + '/signup', { name: name, email: email, password: password });
  }

  login(email: string, password: string) {
    return this.http.post(this.uri + '/authenticate', { email: email, password: password }, { observe: 'response' });
  }

  logout() {
    localStorage.removeItem(this.token);
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

}
