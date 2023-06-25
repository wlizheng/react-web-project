import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useParams} from "react-router";
import Reservation from "../page-detail/reservation";
import ListingReviewsPlaces from "../page-detail/listing-reviews-places";
import Place from "../classes/place"
import {FaMapMarkerAlt, FaStar} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Detail = () => {
   const {id} = useParams(); // place id
   const [place, setPlace] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const location = useLocation();
   const params = new URLSearchParams(location.search);
   const price = params.get('value');
   const avgRt = params.get('rating');
   const [rating, setRating] = useState("");
   const navigate = useNavigate();

   const fetchDetails = async () => {
      try {
         let response;

         if (price) {
            response = await axios.get(`/search/detail/${id}`);
            console.log(response)

            const apiData = response.data.pdp_listing_detail;
            // photos
            const transPhotos = [];
            for (let i = 0; i < 5; i++) {
               const p = apiData.photos[i]?.large;
               console.log("p" + "i" + p);
               if (p) {
                  transPhotos.push(p);
               }
            }
            // price and guests
            const transPrice = parseInt(price.replace(/\$|,/g, ""), 10);
            const transMaxGuests = parseInt(apiData.guest_label);
            const transPlace = new Place(
               id,
               apiData.p3_summary_title,
               apiData.p3_summary_address,
               apiData.sectioned_description.description,
               transPhotos,
               transPrice,
               apiData.localized_check_in_time_window,
               apiData.localized_check_out_time,
               transMaxGuests
            );
            setPlace(transPlace);
         } else {
            response = await axios.get(`/places/${id}`);
            setPlace(response.data);
         }
         setIsLoading(false);
      } catch (e) {
         console.error(e);
         setIsLoading(false);
      }
   };

   const fetchAvgRating = async () => {
      try {
         let res;
         if (price) {
            console.log("price" + price);
            res = parseFloat(avgRt).toFixed(2);
         } else {
            console.log("!price" + price);
            const response = await axios.get(`/rating/${id}`);
            const {avgRating} = response.data;
            res = avgRating;
         }
         setRating(res);
      } catch (e) {
         console.error(e);
      }
   };

   useEffect(() => {
      fetchDetails();
      fetchAvgRating();
   }, []);

   if (isLoading) {
      return <div>Loading...</div>;
   }

   return (
      <div className="container mt-3">
         <div>place page: {id} {price}</div>
         <div>
            <h3>{place.title}</h3>
            <div className="d-flex align-items-center">
               <FaStar className="me-1"/>
               <span className="me-2 fw-semibold">{rating} · </span>
               <FaMapMarkerAlt className="me-1"/>
               <a className="text-black fw-semibold"
                  target="_blank"
                  href={'https://maps.google.com/?q='
                     + place.address}>{place.address}</a>
            </div>
         </div>
         {/*Photos*/}
         <div className="mt-3 rounded-4 overflow-hidden">
            <div className="row">
               <div className="col-12 col-md-6">
                  <img src={place.photos?.[0]}
                       className="object-cover aspect-square" alt=""/>
               </div>
               <div className="d-none d-md-block col-6">
                  <div className="row">
                     <div className="col">
                        <img src={place.photos?.[1]}
                             className="object-cover aspect-square" alt=""/>
                     </div>
                     <div className="col">
                        <img src={place.photos?.[2]}
                             className="object-cover aspect-square " alt=""/>
                     </div>
                  </div>
                  <div className="row mt-4">
                     <div className="col">
                        <img src={place.photos?.[3]}
                             className="object-cover aspect-square" alt=""/>
                     </div>
                     <div className="col">
                        <img src={place.photos?.[4]}
                             className="object-cover aspect-square" alt=""/>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div>
            {/*Info*/}
            <div className="row mt-5">
               <div className="">
                  <div className="d-flex">
                     <div className="col-md-6 col-lg-7 d-none d-md-block pr-20">
                        <h4>About this space</h4>
                        <div className="mb-3 description">
                           {place.description}
                        </div>
                        <div className="">
                           <div className="fw-semibold mb-2">House rules</div>
                           Check-in {place.checkIn}
                           <br/>
                           Checkout before {place.checkOut}
                           <br/>
                           {place.maxGuests} guests maximum
                           <br/>
                        </div>
                     </div>
                     <div className="col-md-6 col-lg-5  col-12">
                        <Reservation place={place} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <ListingReviewsPlaces rating={rating}/>
      </div>
   );
};

export default Detail;