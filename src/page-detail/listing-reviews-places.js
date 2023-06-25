import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useParams} from "react-router";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import {FaStar} from "react-icons/fa";
import {RiUserSmileLine} from "react-icons/ri";

const ListingReviewsPlaces = ({rating}) => {
   const {id} = useParams(); // place id
   const [reviews, setReviews] = useState([]);
   const location = useLocation();
   const params = new URLSearchParams(location.search);
   const price = params.get('value');

   useEffect(() => {
      const fetchReview = async () => {
         try {
            let response;
            if (price) {
               response = await axios.get(`/search/reviews/${id}`);
               const apiData = response.data.reviews;
               console.log({apiData});
               setReviews(apiData);
            } else {
               response = await axios.get(`/reviews/place/${id}`);
               setReviews(response.data);
            }
         } catch (e) {
            console.error("Failed to fetch reviews: ", e);
         }
      }
      fetchReview();
   }, [])

   return (
      <div className="mt-5">
         {rating > 0 &&
            <h5 className="d-flex align-items-center">
               <FaStar className="me-1"/>
               <span className="me-2">{rating}</span>
            </h5>}

         {price ? (
            <div className="d-flex flex-wrap mt-4">
               {reviews?.length > 0 &&
                  reviews.map((review) => (
                     <div className="col-12 col-md-6 border p-3 rounded-4 mb-5"
                          key={review.id}>
                        <div className="d-flex align-items-center
                           text-decoration-none text-black me-2">
                           <RiUserSmileLine className="fs-4 me-1"/>
                           <h5 className="text-capitalize align-items-center">
                              {review.reviewer.first_name}
                           </h5>
                        </div>
                        <div className="text-black-50 text-sm">
                           {review.localized_date}</div>
                        <div className="mt-1 description">
                           {review.comments}
                        </div>
                     </div>
                  ))
               }
            </div>
         ) : (
            <div className="d-flex flex-wrap mt-4">
               {reviews?.length > 0 &&
                  reviews.map((review) => (
                     <div className="col-12 col-md-6 border p-3 rounded-4 mb-5"
                          key={review.id}>
                        <Link to={`/profile/${review.guest._id}`}
                              className="d-flex align-items-center
                              text-decoration-none text-black me-2">
                           <RiUserSmileLine className="fs-4 me-1"/>
                           <h5 className="text-capitalize">
                              {review.guest.username}
                           </h5>
                        </Link>

                        <div>
                           <div className="text-black-50 text-sm">
                              {format(new Date(review.created), "MMMM yyyy")}
                           </div>
                           <div className="mt-1 description">
                              {review.comment}
                           </div>
                        </div>
                     </div>
                  ))
               }
            </div>
         )}
      </div>
   );
}

export default ListingReviewsPlaces;