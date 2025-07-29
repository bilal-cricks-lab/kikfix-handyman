import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserReg, UserRegArray } from '../../types/user';

const userInitial: UserRegArray = {
  regData: null,
};

export const user_Reg = createSlice({
  name: 'user_reg',
  'initialState': userInitial,
  reducers: {
    setRegData: (state, action: PayloadAction<UserReg>) => {
      state.regData = action.payload;
    },
    clearUserData: state => {
      state.regData = null;
    },
  },
});

export const {setRegData, clearUserData} = user_Reg.actions;
export default user_Reg.reducer;