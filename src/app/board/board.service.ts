import { Injectable } from '@angular/core';
import { BoardItem } from '../shared/boardItem.model';
import { initialBoardItems } from '../shared/mocks';
import { HttpClient } from '@angular/common/http';
import { BoardItems } from './board-items';

const mockColumnsData = {
  title: 'Column 1'
}

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private ingredients: BoardItem[] = initialBoardItems;

  constructor(private http: HttpClient) {}


  getBoardItems() {
    // we return copy of array
    // return this.ingredients.slice();

    return this.http.get<BoardItems[]>('http://localhost:3000/dev/board');
  }

  addBoardColumns() {
    console.log('add colums')

    return this.http.post('http://localhost:3000/dev/columns', {title: 'Test'});
  }
}
