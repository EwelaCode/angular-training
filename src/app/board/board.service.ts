import { Injectable } from '@angular/core';
import { BoardItem } from '../shared/boardItem.model';
import { initialBoardItems } from '../shared/mocks';


@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private ingredients: BoardItem[] = initialBoardItems;

  constructor() {}

  getBoardItems() {
    // we return copy of array
    return this.ingredients.slice();
  }
}
