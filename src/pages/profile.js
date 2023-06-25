import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProfileNavSideBar from "../page-profile/profileNavSideBar";
import {useDispatch, useSelector} from "react-redux";
import {
   logoutThunk,
   profileThunk,
   updateUserThunk
} from "../services/auth-thunks";

const Profile = () => {
   const {currentUser} = useSelector((state) => state.user);
   const [profile, setProfile] = useState(currentUser);
   const [update, setUpdate] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const save = async () => {
      await dispatch(updateUserThunk(profile));
      setUpdate(false);
   };

   useEffect(() => {
      const fetchProfile = async () => {
         const {payload} = await dispatch(profileThunk());
         setProfile(payload);
      };
      fetchProfile();
   }, []);

   return (
      <div className="container mt-5">
         <div className="row">
            <div className="col-2">
               <ProfileNavSideBar/>
            </div>
            <div className="col text-center justify-content-center">
               <div>
                  <h3 className="mb-4">Profile</h3>
                  <div className="wb-form border-0 mb-2">
                     {!update ? (
                        <div>
                           {profile && (
                              <div>
                                 <p>Welcome, {profile.username}!</p>
                                 <p>Email: {profile.email}</p>
                                 <p>Role: {profile.role}</p>
                              </div>
                           )}

                           <button onClick={() => setUpdate(true)}
                                   className="wb-form w-25 bg-[#ff5160] text-white">
                              Update
                           </button>
                        </div>
                     ) : (
                        <div className="p-3 rounded-4">
                           <div className="">
                              <label className="me-2 p-2">Username</label>
                              <input
                                 type="text"
                                 value={profile.username}
                                 className="p-1 rounded-4 border"
                                 onChange={(event) => {
                                    const newProfile = {
                                       ...profile,
                                       username: event.target.value
                                    };
                                    setProfile(newProfile);
                                 }}
                              />
                           </div>

                           <button onClick={save}
                                   className="wb-form w-25 bg-[#ff5160] text-white mt-3">
                              Save
                           </button>
                        </div>
                     )}

                     <button onClick={() => {dispatch(logoutThunk());
                                             navigate('/');}}
                             className="wb-form w-25 bg-[#ff5160] text-white">
                        Logout
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Profile;