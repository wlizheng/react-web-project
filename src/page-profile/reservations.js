import ProfileNavSideBar from "./profileNavSideBar";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {format} from "date-fns";
import {VscArrowSmallRight, VscCalendar} from "react-icons/vsc";
import {Link} from "react-router-dom";
import WriteReview from "../page-detail/write-review";

const Reservations = () => {
   const [reservations, setReservations] = useState([]);
   const [showReviewForm, setShowReviewForm] = useState(false);
   const [selectedReservation, setSelectedReservation] = useState(null);

   useEffect(() => {
      const fetchReservations = async () => {
         try {
            const response = await axios.get('/reservations');
            setReservations(response.data);
         } catch (e) {
            console.error("Failed to fetch reservations: ", e);
         }
      }
      fetchReservations();
   }, []);

   const handleReview = async (reservation) => {
      const response = await axios.get(
         `/review/check?reservationId=${reservation._id}&userId=${reservation.guest._id}`);
      const reviews = response.data;

      if (reviews !== null) {
         alert("You have already written a review for this reservation.");
      } else {
         setShowReviewForm(true);
         setSelectedReservation(reservation);
      }
   }

   const handleCancelReview = () => {
      setShowReviewForm(false);
      setSelectedReservation(null);
   };

   return (
      <div className="container mt-5">
         <div className="row">
            <div className="col-2">
               <ProfileNavSideBar/>
            </div>
            <div className="col-10 justify-content-center">
               <h3 className="text-center mb-4">My trips</h3>
               {reservations?.length > 0 && reservations.map((reservation) => (
                  <div>
                     <div className=" mb-4 border p-3 rounded-4 shadow">
                        <div className="d-flex
                        text-decoration-none text-black"
                             key={reservation._id}>
                           {reservation.place.photos?.[0] && (
                              <Link to={`/detail/${reservation.place._id}`}
                                    className="w-32 flex-shrink-0 me-3">
                                 <img src={reservation.place.photos[0]}
                                      className="object-cover aspect-square rounded-4"
                                      alt=""/>
                              </Link>
                           )}
                           <div className="d-none d-lg-block p-2 col">
                              <h5>{reservation.place.title}</h5>
                              <div
                                 className="flex align-items-center mb-2 truncate">
                                 <VscCalendar/>{format(
                                 new Date(reservation.checkIn),
                                 "yyyy-MM-dd")}
                                 <VscArrowSmallRight/> <VscCalendar/>{format(
                                 new Date(reservation.checkOut), "yyyy-MM-dd")}
                              </div>
                              <div>
                                 Number of guests: {reservation.numOfGuests}
                                 <br/>
                                 Total price: ${reservation.price.toLocaleString()}
                              </div>
                           </div>
                           <div className="float-end">
                              <button onClick={() => handleReview(reservation)}
                                      className="btn btn-primary">review
                              </button>
                           </div>
                        </div>

                        {selectedReservation?._id === reservation._id && (
                           <div className="border p-3 rounded-4 bg-light mt-3">
                              <h5>Write a review</h5>
                              <div className="d-flex">
                                 <div className="col">
                                    <WriteReview
                                       reservation={selectedReservation}
                                       onCancelReview={handleCancelReview}/>
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Reservations;