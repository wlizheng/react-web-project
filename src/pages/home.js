import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";
import Like from "../page-detail/like";

const Home = () => {
   const {currentUser} = useSelector((state) => state.user);
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

   return (
      <div className="container-fluid mt-5">
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
                        <button className="">
                           <Like placeId={place._id}
                                 currentUser={currentUser}
                                 initialLiked={false}/>
                        </button>
                     </div>
                     {place._id}
                     <div className="mt-1 fw-bold">{place.address}</div>
                     <div className="text-black-50">{place.title}</div>
                     <div className="mt-1">
                        <span className="font-bold">${place.price}</span> night
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
};
export default Home;
