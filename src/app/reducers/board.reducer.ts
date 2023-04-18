import * as BoardActions from "./board.actions";

export interface BoardItemsState {
  boardItems: any[];
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
    case BoardActions.ADD_BOARD_ITEM:
      return {
        ...state,
        boardItems: [...state.boardItems, action.payload],
      };
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
