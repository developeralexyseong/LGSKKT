import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Board } from '../model/board';

export interface BoardState {
  boardList: Board[];
}

const initialState: BoardState = {
  boardList: []
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoardList: (state, action: PayloadAction<Board[]>) => {
      state.boardList = action.payload;
    }
  }
});

export const { setBoardList } = boardSlice.actions;
export const getBoardList = (state: RootState) => state.board.boardList;

export default boardSlice.reducer;
