import {createAsyncThunk} from "@reduxjs/toolkit";
import * as authService from "./auth-service";

export const loginThunk = createAsyncThunk(
   "auth/login", async ({email, password}) => {
      return await authService.login({email, password});
   }
);

export const registerThunk = createAsyncThunk(
   "auth/register", async ({username, email, password, role}) => {
      return await authService.register({username, email, password, role});
   }
);

export const profileThunk = createAsyncThunk(
   "auth/profile", async () => {
      return await authService.profile();
   }
);

export const logoutThunk = createAsyncThunk(
   "auth/logout", async () => {
      return await authService.logout();
   }
);

export const updateUserThunk = createAsyncThunk(
   "user/updateUser", async (user) => {
      await authService.updateUser(user);
      return user;
   }
);