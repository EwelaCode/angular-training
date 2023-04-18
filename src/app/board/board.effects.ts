import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { BoardService } from './board.service';
import { SET_BOARD_ITEMS, SET_BOARD_ITEMS_SUCCESS } from '../reducers/board.actions';

@Injectable()
export class BoardEffects {

  loadBoard$ = createEffect(() => this.actions$.pipe(
    ofType(SET_BOARD_ITEMS),
    exhaustMap(() => this.boardItemsService.getBoardItems()
      .pipe(
        map(items => ({ type: SET_BOARD_ITEMS_SUCCESS, payload: items })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private boardItemsService: BoardService,
  ) {}
}
