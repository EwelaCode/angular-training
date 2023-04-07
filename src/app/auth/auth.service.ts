import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(username: string, password: string) {
    return this.http
      .post('http://localhost:3000/dev/auth/signup', { username, password })
  }

  login(username: string, password: string) {
    return this.http
      .post('http://localhost:3000/dev/auth/login', { username, password })
  }

  // handleError(errorResponse: HttpErrorResponse) {
  //   return errorResponse;
  // }
}

