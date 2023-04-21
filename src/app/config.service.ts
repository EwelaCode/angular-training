import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public config: any;

  constructor(private http: HttpClient) {
    this.http.get('/assets/config.json').subscribe((config: any) => {
      this.config = config;
      console.log(config, 'CONFIG!!!!!')
    });
  }
}
