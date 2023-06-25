import ProfileNavSideBar from "./profileNavSideBar";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Like from "../page-detail/like";

const Likes = () => {
   const currentUser = useSelector((state) => state.user.currentUser);
   const [likes, setLikes] = useState([]);

   useEffect(() => {
      const fetchLike = async () => {
         try {
            const response = await axios.get(
               `/likes/user/${currentUser._id}`);
            setLikes(response.data);
         } catch (e) {
            console.error("Failed to fetch reviews: ", e);
         }
      }
      fetchLike();
   }, [])

   return (
      <div className="container mt-5">
         <div className="row">
            <div className="col-2">
               <ProfileNavSideBar/>
            </div>
            <div className="col">
               <h3 className="text-center mb-3">My likes</h3>
               <div className="row">
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
                              <button className="">
                                 <Like placeId={like.place._id}
                                       currentUser={currentUser}
                                       initialLiked={true}/>
                              </button>
                           </div>
                           <div className="mt-1 fw-bold">{like.place.address}</div>
                           <div className="text-black-50">{like.place.title}</div>
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
export default Likes;