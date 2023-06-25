import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {BsHouseAdd} from "react-icons/bs";

const Host = () => {
   const currentUser = useSelector((state) => state.user.currentUser);
   const [places, setPlaces] = useState([]);
   useEffect(() => {
      const fetchPlaces = async () => {
         try {
            const response = await axios.get(`/places/owner/${currentUser._id}`);
            setPlaces(response.data);
         } catch (e) {
            console.error("Failed to fetch places of the host: ", e);
         }
      }
      fetchPlaces();
   }, []);

   return (
      <div className="container mt-5">
         <h4 className="text-center mb-4">My hosts</h4>
         <div className="text-center mb-4">
            <Link to={'/host/new'} className="align-items-center btn btn-primary fw-semibold">
               <div className="d-flex">
                  <BsHouseAdd className="me-3 fs-4"/> Host your home
               </div>
            </Link>
         </div>
         <div>
            {places.length > 0 && places.map(place => (
               <Link to={'/detail/' + place._id}
                     className="flex text-decoration-none text-black
                     border shadow rounded-4 p-3 mb-4">
                  <div className="w-48 me-3 flex-shrink-0">
                     <img src={place.photos?.[0]}
                          className="object-cover aspect-square rounded-4"
                          alt=""/>
                  </div>
                  <div>
                     <div className="fw-semibold">{place.title}</div>
                     <p className="text-sm mt-2 description">{place.description}</p>
                     <div className="fw-semibold mb-1">$ {place.price.toLocaleString()} </div>
                     <div className="text-sm text-secondary">
                        CheckIn {place.checkIn} <br/>
                        CheckOut {place.checkOut} <br/>
                        Maximum guests: {place.maxGuests} <br/>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
}

export default Host;