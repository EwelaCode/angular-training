import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public config: any;

  constructor(private http: HttpClient) {}

  initialize() {
   return this.http.get('/assets/config.json')
    .pipe(
      delay(100),
      tap(data => this.config = data)
    );

  }
}
