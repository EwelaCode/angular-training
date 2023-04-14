import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

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
    return this.http.post(Location.joinWithSlash(environment.url, '/auth/signup'), {
      username,
      password,
    });
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(Location.joinWithSlash(environment.url, '/auth/login'), {
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

