import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BoardItems } from '../board-items';


@Injectable({
  providedIn: 'root',
})
export class SearchService {

  constructor(private http: HttpClient) {}

  search(term: string): Observable<any> {
    return this.http
      .get<BoardItems>(Location.joinWithSlash(environment.url, `/board`), {params: {search: term}})
      .pipe(map((response) => {
       return response.columns.map(column => column.title)
      }));
  }
}
