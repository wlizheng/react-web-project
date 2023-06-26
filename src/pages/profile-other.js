import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import axios from "axios";
import {Link} from "react-router-dom";

const ProfileOther = () => {
   const {id} = useParams();
   const [user, setUser] = useState(null);
   const [likes, setLikes] = useState([]);
   const location = useLocation();
   const params = new URLSearchParams(location.search);
   const value = params.get('value');

   useEffect(() => {
      if (!value) {
         const fetchUserData = async () => {
            try {
               const response = await axios.get(`/user?userId=${id}`);
               setUser(response.data);
            } catch (error) {
               console.error("Error fetching user data:", error);
            }
         };
         fetchUserData();
      }
   }, [id]);

   useEffect(() => {
      if (!value) {
         const fetchLikeData = async () => {
            try {
               const response = await axios.get(`/likes/user?userId=${id}`);
               setLikes(response.data);
            } catch (error) {
               console.error("Error fetching user data:", error);
            }
         };
         fetchLikeData();
      }
   }, [id]);

   return (
      <div className="container mt-5">
         <div className="">
            <div className="col justify-content-center">
               <h3>
                  Profile
               </h3>
               <h5 className="d-flex">
                  <div className="me-2">username:</div>
                  {value
                     ? <div> {value}</div>
                     : <div> {user && user.username}</div>
                  }
               </h5>
               <div className="row mt-4">
                  <h3>Likes</h3>
                  {likes.length < 1 && (
                     <div>
                        {value ? <h5>No likes for {value}</h5>
                           : <h5>No likes for {user && user.username}</h5>}
                     </div>
                  )}
                  {likes.length > 0 && likes.map(like => (
                     <Link to={`/detail/${like.place._id}`}
                           className="text-black text-decoration-none mb-4
                     col-lg-3 col-md-4 col-sm-6 col-12"
                           key={like.place.id}>
                        <div className="text-sm truncate">
                           <div className="position-relative">
                              <img src={like.place.photos?.[0]}
                                   className="object-cover aspect-square rounded-4"
                                   alt=""/>
                           </div>
                           <div
                              className="mt-2 fw-bold">{like.place.address}</div>
                           <div
                              className="text-black-50">{like.place.title}</div>
                           <div className="mt-1">
                              <span
                                 className="font-bold">${like.place.price}</span> night
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProfileOther;