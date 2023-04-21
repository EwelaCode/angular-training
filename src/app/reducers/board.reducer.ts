import { BoardColumn } from "../board/board-items";
import {produce} from "immer";

import * as BoardActions from "./board.actions";

export interface BoardItemsState {
  boardItems: BoardColumn[];
  editedBoardItem: any;
  editedIngredientIndex: number;
}

const initialState: BoardItemsState = {
  boardItems: [],
  editedBoardItem: null,
  editedIngredientIndex: -1,
};

export function boardItemsReducer(
  state: BoardItemsState = initialState,
  action: BoardActions.BoardActions
) {
  switch (action.type) {

    case BoardActions.SET_BOARD_ITEMS_SUCCESS:
      return {
        ...state,
        boardItems: [...action.payload],
      };

    case BoardActions.ADD_BOARD_ITEM:
      const nextState = produce(state, draftState => {
        draftState.boardItems.map(el => el.id !== action.payload.columnId? el : el.tasks.push(action.payload))
      })
      return nextState;
    case BoardActions.UPDATE_BOARD_ITEM:
      const boardItem = state.boardItems[state.editedIngredientIndex];
      const updatedBoardItem = {
        ...boardItem,
        ...action.payload,
      };
      const updateIngredients = [...state.boardItems];
      updateIngredients[state.editedIngredientIndex] = updatedBoardItem;

      return {
        ...state,
        boardItems: updateIngredients,
        editedBoardItem: null,
        editedIngredientIndex: -1,
      };

    default:
      return state;
  }
}
