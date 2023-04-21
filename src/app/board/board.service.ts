import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BoardColumn, BoardItem, BoardItems } from './board-items';
import { environment } from 'src/environments/environment';
import { Observable, Subject, map, tap } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {

  boardItems: BoardColumn[] = [];

  dataChanged$ = new Subject<void>();

  constructor(private http: HttpClient,
    private configService: ConfigService
    ) {}

  getBoardItems() {
    const apiUrl = Location.joinWithSlash(this.configService.config.url , '/board')
    // safe option to connect url to avoid // or no slash at all => Location.joinWithSlash
    //<BoardItems[]>
    return this.http
      .get<BoardItems>(apiUrl)
      .pipe(
        map((data) => data.columns),
      );
  }

  addBoardItem(data: BoardItem) {
    return this.http.post(Location.joinWithSlash(environment.url, '/tasks'), data)
      .pipe(
        // here we can handle dispach action
        tap(() => this.dataChanged$.next())
      );
  }
}
