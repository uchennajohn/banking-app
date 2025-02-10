
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  loggedIn: boolean;
}

const initialState: UserState = {
  name: '',
  loggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string }>) => {
      state.name = action.payload.name;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.name = '';
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUserState = (state: { user: UserState }) => state.user;
export default userSlice.reducer;

