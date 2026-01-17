import { createSlice } from '@reduxjs/toolkit';

type TUser = {
      _id: string;
      id?: string;
      email: string;
      role: 'ADMIN' | 'SUPERADMIN';
      iat: number;
      exp: number;
};
type TInitialState = {
      user: null | TUser;
      token: null | string;
};
const initialState: TInitialState = {
      user: null,
      token: null,
};

const authSlice = createSlice({
      name: 'auth',
      initialState,
      reducers: {
            setUser: (state, action) => {
                  state.user = action.payload.user;
                  state.token = action.payload.token;
            },
            removeUser: (state) => {
                  state.user = null;
                  state.token = null;
            },
      },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
