import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { BoardItem } from '../shared/boardItem.model';
import { initialBoardItems } from '../shared/mocks';
import { HttpClient } from '@angular/common/http';
import { BoardItems } from './board-items';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private ingredients: BoardItem[] = initialBoardItems;

  constructor(private http: HttpClient) {}


  getBoardItems() {
    // we return copy of array
    // return this.ingredients.slice();

    // safe option to connect url to avoid // or no slash at all => Location.joinWithSlash
    return this.http.get<BoardItems[]>( Location.joinWithSlash(environment.url, '/board') );
  }

  addBoardColumns() {
    console.log('add colums')

    return this.http.post(Location.joinWithSlash(environment.url, '/columns'), {title: 'Test'});
  }

  addBoardItem(data: BoardItem) {
        this.ingredients.push(data);

        return this.http.post(Location.joinWithSlash(environment.url, '/tasks'), {
          title: data.name,
          description: data.description,
          columnId: 'b847f8d2-c234-48d2-809d-f5f7b141814b'
        });
  }
}
