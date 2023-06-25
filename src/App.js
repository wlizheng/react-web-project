import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/login";
import Layout from "./layout";
import Register from "./pages/register";
import Home from "./pages/home";
import Host from "./pages/host";
import Profile from "./pages/profile";
import Reservations from "./page-profile/reservations";
import Detail from "./pages/detail";
import {Provider} from "react-redux";
import axios from "axios";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/auth-reducer";
import AdminPlaces from "./page-admin/admin-places";
import Reviews from "./page-profile/reviews";
import Likes from "./page-profile/likes";
import ProfileOther from "./pages/profile-other";
import AdminReservations from "./page-admin/admin-reservations";
import HostNewPlace from "./page-host/host-new-place";
import Search from "./page-home/search";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const store = configureStore({reducer: {user: authReducer}});

function App() {
   return (
      <Provider store={store}>
         <BrowserRouter>
            <div>
               <Routes>
                  <Route path="/" element={<Layout/>}>
                     <Route index element={<Home/>}/>
                     <Route path="/login" element={<Login/>}/>
                     <Route path="/signup" element={<Register/>}/>
                     <Route path="/profile" element={<Profile/>}/>
                     <Route path="/profile" element={<Profile/>}/>
                     <Route path="/search" element={<Search/>}/>
                     <Route path="/profile/:id" element={<ProfileOther/>}/>
                     <Route path="/reservations" element={<Reservations/>}/>
                     <Route path="/reviews" element={<Reviews/>}/>
                     <Route path="/likes" element={<Likes/>}/>
                     <Route path="/detail/:id" element={<Detail/>}/>
                     <Route path="/host" element={<Host/>}/>
                     <Route path="/host/new" element={<HostNewPlace/>}/>
                     <Route path="/admin/places" element={<AdminPlaces/>}/>
                     <Route path="/admin/reservations" element={<AdminReservations/>}/>

                  </Route>
               </Routes>
            </div>
         </BrowserRouter>
      </Provider>
   );
}

export default App;