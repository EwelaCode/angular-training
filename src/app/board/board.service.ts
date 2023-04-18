import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { initialBoardItems } from '../shared/mocks';
import { HttpClient } from '@angular/common/http';
import { BoardColumn, BoardItem, BoardItems } from './board-items';
import { environment } from 'src/environments/environment';
import { Observable, Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {

  boardItems: BoardColumn[] = [];

  dataChanged$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  getBoardItems() {
    // safe option to connect url to avoid // or no slash at all => Location.joinWithSlash
    //<BoardItems[]>
    return this.http
      .get<BoardItems>(Location.joinWithSlash(environment.url, '/board'))
      .pipe(
        map((data) => data.columns),
      );
  }

  addBoardColumns() {
    return this.http.post(Location.joinWithSlash(environment.url, '/columns'), {
      title: 'Test',
    });
  }

  addBoardItem(data: BoardItem) {
    return this.http.post(Location.joinWithSlash(environment.url, '/tasks'), data)
      .pipe(
        // here we can handle dispach action
        tap(() => this.dataChanged$.next())
      );
  }
}
