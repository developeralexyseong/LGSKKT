import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface UserState {
  userName: string;
}

const initialState: UserState = {
  userName: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});

export const { setUserName } = userSlice.actions;
export const getUserName = (state: RootState) => state.user.userName;
export default userSlice.reducer;
