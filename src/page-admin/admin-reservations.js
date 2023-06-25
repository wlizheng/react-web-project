import AdminNavSideBar from "./adminNavSideBar";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {VscArrowSmallRight, VscCalendar} from "react-icons/vsc";
import {format} from "date-fns";
import {TiDeleteOutline} from "react-icons/ti";

const AdminReservations = () => {
   const [reservations, setReservations] = useState([]);

   useEffect(() => {
      const fetchReservations = async () => {
         try {
            const response = await axios.get(`/reservations/all`);
            setReservations(response.data);
         } catch (error) {
            console.error("Error fetching places:", error);
         }
      };
      fetchReservations();
   }, []);

   const handleDelete = async (reservationId) => {
      try {
         await axios.delete(`/reservation/${reservationId}`);
         setReservations(reservations => reservations.filter(
            reservation => reservation._id !== reservationId));
      } catch (error) {
         console.error("Error handling like:", error);
      }
   };

   return (
      <div className="container mt-5">
         <div className="row">
            <div className="col-2">
               <AdminNavSideBar/>
            </div>
            <div className="col justify-content-center">
               {reservations?.length > 0 && reservations.map((reservation) => (
                  <div>
                     <div
                        className="mb-4 border p-3 rounded-4 shadow position-relative">
                        <div className="d-flex text-decoration-none text-black"
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
                                 Guest: <span className="text-capitalize">
                                 {reservation.guest.username}</span>
                                 <br/>
                                 Total price: ${reservation.price.toLocaleString()}
                              </div>
                           </div>
                        </div>
                        <button className="position-absolute top-2 end-2 p-2"
                                onClick={() => handleDelete(reservation._id)}>
                           <TiDeleteOutline className="fs-2 text-black-50"/>
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};
export default AdminReservations;