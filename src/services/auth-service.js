import axios from "axios";

const USERS_URL = "http://localhost:4000";
const api = axios.create({withCredentials: true});

export const register = async ({username, email, password, role}) => {
   const response =  await api.post(`${USERS_URL}/register`,
      {username, email, password, role});
   return response.data;
};

export const login = async ({email, password}) => {
   const response = await api.post(`${USERS_URL}/login`,
      {email, password});
   return response.data;
};

export const profile = async () => {
   const response = await api.get(`${USERS_URL}/profile`);
   return response.data;
};

export const logout = async () => {
   const response = await api.post(`${USERS_URL}/logout`);
   return response.data;
};

export const updateUser = async (user) => {
   const response = await api.put(`${USERS_URL}/users/${user._id}`, user);
   return response.data;
};
