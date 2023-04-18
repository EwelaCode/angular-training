import { Action } from '@ngrx/store';

export const SET_BOARD_ITEMS = 'SET_BOARD_ITEMS';
export const SET_BOARD_ITEMS_SUCCESS = 'SET_BOARD_ITEMS_SUCCESS';
export const ADD_BOARD_ITEM = 'ADD_BOARD_ITEM';
export const UPDATE_BOARD_ITEM = 'UPDATE_BOARD_ITEM';

export class SetBoardItems implements Action {
  readonly type = SET_BOARD_ITEMS;

  constructor() {}
}

export class SetBoardItemsSuccess implements Action {
  readonly type = SET_BOARD_ITEMS_SUCCESS;

  constructor(public payload: any) {}
}

export class AddBoardItem implements Action {
   readonly type = ADD_BOARD_ITEM;

   constructor(public payload: any) {}
}

export class UpdateBoardItem implements Action {
   readonly type = UPDATE_BOARD_ITEM;

   constructor(public payload: any) {}
}

export type BoardActions =
  | SetBoardItems
  | SetBoardItemsSuccess
  | AddBoardItem
  | UpdateBoardItem;
