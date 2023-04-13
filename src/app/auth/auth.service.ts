import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface AuthResponseData {
  access_token: string,
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //get/set
  token = '';


  constructor(private http: HttpClient) {}

  signUp(username: string, password: string) {
    return this.http.post('http://localhost:3000/dev/auth/signup', {
      username,
      password,
    });
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:3000/dev/auth/login', {
        username,
        password,
      })
      .pipe(
        // catchError(this.handleError),
        tap((resData) => {
          this.token = resData.access_token;
        })
      );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    return throwError(() => errorResponse.message);
  }

}

