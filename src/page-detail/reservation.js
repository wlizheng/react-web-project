import React, {useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Reservation = ({place}) => {
   const {currentUser} = useSelector((state) => state.user);
   const [checkIn, setCheckIn] = useState("");
   const [checkOut, setCheckOut] = useState("");
   const [numOfGuests, setNumOfGuests] = useState(1);
   const navigate = useNavigate();

   let numOfDays = 0;
   if (checkIn && checkOut) {
      numOfDays = differenceInCalendarDays(new Date(checkOut),
         new Date(checkIn));
   }

   const handleReserve = async () => {
      if (!currentUser) {
         alert("Please login!");
         navigate("/login");
         return;
      }

      if (numOfGuests < 1 || numOfGuests > place.maxGuests) {
         alert("Invalid number of guests!");
         return;
      }

      // check if place exists
      try {
         let placeId;
         let exist;
         if (place._id) {
            placeId = place._id;
            exist = true;
         } else {
            placeId = place.id;
            exist = false;
         }
         console.log(placeId);
         if (!exist) {
            const newPlace = await axios.post('/places', {
               title: place.title,
               address: place.address,
               description: place.description,
               price: place.price,
               checkIn: place.checkIn,
               checkOut: place.checkOut,
               maxGuests: place.maxGuests,
               photos: place.photos,
               owner: currentUser._id,
            });
            placeId = newPlace.data._id;
         }

         await axios.post('/reservations', {
            checkIn, checkOut, numOfGuests,
            guest: currentUser._id,
            place: placeId,
            price: numOfDays * place.price,
         });
         navigate('/reservations');
      } catch (e) {
         console.log(e);
      }
   };

   return (
      <div
         className="shadow rounded-4 border-2">
         <div className="row mt-3 p-3">
            <h5>${place.price} / night</h5>
         </div>

         <div className="row px-4 p-3 fw-semibold text-sm">
            <div
               className="p-3 border rounded-top-4 border-bottom-0 d-flex">
               <div className="col border-end me-2">
                  <label className="">CHECK-IN </label> <br/>
                  <input type="date" value={checkIn}
                         min={new Date().toISOString().split('T')[0]}
                         onChange={e => setCheckIn(e.target.value)}/>
               </div>
               <div className="col">
                  <label className="">CHECKOUT </label><br/>
                  <input type="date" value={checkOut}
                         min={checkIn}
                         onChange={e => setCheckOut(e.target.value)}/>
               </div>
            </div>
            <div
               className="p-3 border text-center rounded-bottom-4">
               <label className="me-3">GUESTS</label>
               <input type="number" min="1" max={place.maxGuests}
                      value={numOfGuests}
                      onChange={e => setNumOfGuests(e.target.value)}
                      className="text-center border rounded-4 p-1 px-3 w-50"/>
            </div>
         </div>

         <div className="px-2">
            <button onClick={handleReserve}
                    className="mb-4 bg-[#ff5160] fw-semibold text-white wb-form">
               Reserve
               {numOfDays > 0 && (<span> ${numOfDays * place.price} </span>)}
            </button>
         </div>
      </div>
   )
}
export default Reservation;