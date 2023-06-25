import {createSlice} from "@reduxjs/toolkit";
import {
   loginThunk, logoutThunk, profileThunk, registerThunk, updateUserThunk
} from "../services/auth-thunks";

const authSlice = createSlice({
   name: 'auth',
   initialState: {currentUser: null},
   reducers: {},
   extraReducers: {
      [loginThunk.fulfilled]: (state, action) => {
         state.currentUser = action.payload;
      },
      [registerThunk.fulfilled]: (state, {payload}) => {
         state.currentUser = payload;
      },
      [profileThunk.fulfilled]: (state, {payload}) => {
         state.currentUser = payload;
      },
      [profileThunk.rejected]: (state, {payload}) => {
         state.currentUser = null;
      },
      [profileThunk.pending]: (state, action) => {
         state.currentUser = null;
      },
      [logoutThunk.fulfilled]: (state) => {
         state.currentUser = null;
      },
      [updateUserThunk.fulfilled]: (state, {payload}) => {
         state.currentUser = payload;
      },
   }
});

export default authSlice.reducer;