import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { BoardItemsState, boardItemsReducer } from './board.reducer';

export const rootReducer = {};

export interface State {
  boardItems: BoardItemsState;
}

export const reducers: ActionReducerMap<State, any> = {
  boardItems: boardItemsReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
