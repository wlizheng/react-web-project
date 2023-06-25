import React, {useEffect, useState} from "react";
import AdminNavSideBar from "./adminNavSideBar";
import axios from "axios";
import {Link} from "react-router-dom";
import {TiDeleteOutline} from "react-icons/ti";

const AdminPlaces = () => {
   const [places, setPlaces] = useState([]);

   useEffect(() => {
      const fetchPlaces = async () => {
         try {
            const response = await axios.get(`/places`);
            setPlaces(response.data);
         } catch (error) {
            console.error("Error fetching places:", error);
         }
      };
      fetchPlaces();
   }, []);

   const handleDelete = async (event, placeId) => {
      event.preventDefault();

      try {
         await axios.delete(`/places/${placeId}`);
         setPlaces(places => places.filter(place => place._id !== placeId));
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
            <div className="col text-center justify-content-center">
               <div className="row">
                  {places.length > 0 && places.map(place => (
                     <Link to={`/detail/${place._id}`}
                           className="text-black text-decoration-none mb-4
                     col-lg-3 col-md-4 col-sm-6 col-12"
                           key={place.id}>
                        <div className="text-sm truncate">
                           <div className="position-relative">
                              <img src={place.photos?.[0]}
                                   className="object-cover aspect-square rounded-4"
                                   alt=""/>
                              <button
                                 className="position-absolute top-0 end-0 p-2"
                                 onClick={(e) => handleDelete(e, place._id)}>
                                 <TiDeleteOutline className="fs-2" style={{color: "white"}}/>
                              </button>
                           </div>
                           {place._id}
                           <div className="mt-1 fw-bold">{place.address}</div>
                           <div className="text-black-50">{place.title}</div>
                           <div className="mt-1">
                              <span
                                 className="font-bold">${place.price}</span> night
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}

export default AdminPlaces;