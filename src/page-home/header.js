import React, {useEffect, useState} from "react";
import {FaAirbnb, FaUserCircle} from "react-icons/fa";
import {FiSearch} from "react-icons/fi";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {profileThunk} from "../services/auth-thunks";

function Header() {
   const currentUser = useSelector((state) => state.user.currentUser);
   const [profile, setProfile] = useState(currentUser);
   const [searchLocation, setSearchLocation] = useState("");

   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
         const fetchProfile = async () => {
            const { payload } = await dispatch(profileThunk());
            setProfile(payload);
         };
         fetchProfile();
   }, []);

   const handleSearch = (e) => {
      e.preventDefault();
      const query = {
         location: searchLocation,
      };
      navigate('/search?' + new URLSearchParams(query));
      setSearchLocation("");
   };

   return (
      <div>
         <div className="p-3 row d-flex align-items-center border-0 border-bottom">
            {/*left-logo*/}
            <Link to={'/'} className="d-inline-flex d-none d-md-block col-md-4
             align-items-center text-[#ff5160] text-decoration-none fw-bold">
               <FaAirbnb className="fs-1"/>
            </Link>

            <form onSubmit={handleSearch}
                  className="col d-flex border rounded-pill py-1">
               <input type="text"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      placeholder="Search your destination"
                      className="flex-grow outline-0 mx-1"/>
               <button className="bg-[#ff5160] p-2 rounded-pill">
                  <FiSearch className="text-white"/>
               </button>
            </form>

            {/*right*/}
            <div className="d-none d-lg-block col d-flex">
               <div className="btn-group d-flex float-end">
                  {currentUser && currentUser.role === "host" && (
                     <div>
                        <button
                           className="btn btn-light fw-semibold rounded-pill me-3">
                           <Link to={'/host'}
                                 className="text-decoration-none text-black">
                              Host your home </Link>
                        </button>
                     </div>
                  )}
                  {currentUser && currentUser.role === "admin" && (
                     <div>
                        <button
                           className="btn btn-light fw-semibold rounded-pill me-3">
                           <Link to={'/admin/places'}
                                 className="text-decoration-none text-black">
                              Admin</Link>
                        </button>
                     </div>
                  )}
                  <div className="d-flex text-decoration-none
                        align-items-center border rounded-pill p-1 px-2">
                     {!currentUser &&
                        <Link to={"/login"} className="m-1 text-[#ff5160]">
                           <FaUserCircle className="fs-4"/>
                        </Link>}
                     {currentUser &&
                        <Link to={"/profile"}
                              className="d-flex align-items-center
                              text-[#ff5160] text-decoration-none fw-semibold">
                           <FaUserCircle className="fs-4 m-1"/>
                           {currentUser && currentUser.username}
                        </Link>}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Header;
