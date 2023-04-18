import { Action } from '@ngrx/store';

export const ADD_BOARD_ITEM = 'ADD_BOARD_ITEM';
export const UPDATE_BOARD_ITEM = 'UPDATE_BOARD_ITEM';


export class AddBoardItem implements Action {
   readonly type = ADD_BOARD_ITEM;

   constructor(public payload: any) {}
}

export class UpdateBoardItem implements Action {
   readonly type = UPDATE_BOARD_ITEM;

   constructor(public payload: any) {}
}

export type BoardActions =
  | AddBoardItem
  | UpdateBoardItem;
