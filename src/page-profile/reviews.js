import ProfileNavSideBar from "./profileNavSideBar";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import {Link} from "react-router-dom";

const Reviews = () => {
   const currentUser = useSelector((state) => state.user);
   const [reviews, setReviews] = useState([]);

   useEffect(() => {
      const fetchReview = async () => {
         try {
            const response = await axios.get(
               `/reviews/user/${currentUser._id}`);
            setReviews(response.data);
         } catch (e) {
            console.error("Failed to fetch reviews: ", e);
         }
      }
      fetchReview();
   }, [])

   return (
      <div className="container mt-5">
         <div className="row">
            <div className="col-2">
               <ProfileNavSideBar/>
            </div>
            <div className="col-10">
               <h3 className="text-center">My reviews</h3>
               <div className="mt-4">
                  {reviews?.length > 0 && reviews.map((review) => (
                     <div className="mb-4 border p-3 rounded-4 shadow">
                        <div className="d-flex">
                           {review.place.photos?.[0] && (
                              <Link to={`/detail/${review.place._id}`}
                                    className="w-32 flex-shrink-0 me-3">
                                 <img src={review.place.photos[0]}
                                      className="object-cover aspect-square rounded-4"
                                      alt=""/>
                              </Link>
                           )}
                           <div className="p-3 me-5 mb-4">
                              <h5 className="review">{review.place.title}</h5>
                              <div>rating: {review.rating}</div>
                              <div className="review">{review.comment}</div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};
export default Reviews;