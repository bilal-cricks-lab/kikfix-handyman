import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProps, UserArray } from '../../types/user';

const userInitialState: UserArray = {
  user: null,
};

export const user_Slice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    clearUserData: state => {
      state.user = null;
    },
  },
});

export const {setUserData, clearUserData} = user_Slice.actions;
export default user_Slice.reducer;