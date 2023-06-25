import axios from "axios";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";

const Search = () => {
   const loc = useLocation();
   const searchParams = new URLSearchParams(loc.search);
   const location = searchParams.get("location");
   const [listings, setListings] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const searchAirbnb = async () => {
         try {
            const response = await axios.get(`/search?location=${location}`);
            const exploreTabs = response.data.explore_tabs;
            const sectionListings = [];
            const sections = exploreTabs[0]?.sections || [];
            sections.forEach((section) => {
               if (section.result_type === "listings") {
                  let data = section.listings || [];
                  data = data.filter((v) => {
                     return v.listing.id.toString().length < 10
                  })
                  sectionListings.push(...data);
               }
            });

            setListings(sectionListings);
            setIsLoading(false);
         } catch (e) {
            console.error(e);
            setIsLoading(false);
         }
      };

      searchAirbnb();
   }, [location]);

   if (isLoading) {
      return <div>Loading...</div>;
   }

   return (
      <div className="container mt-5">
         <h4 className="mb-4">
            Explore your next stay in {location}
         </h4>
         <div className="row mb-2">
            {listings.length > 0 && listings.map(listing => (
               <Link to={`/detail/${listing.listing.id}?value=${listing
                  .pricing_quote.structured_stay_display_price.primary_line.price}
                  &rating=${listing.listing.avg_rating}`}
                     className="text-black text-decoration-none mb-4
                     col-lg-3 col-md-4 col-sm-6 col-12"
                     key={listing.id}>
                  <div className="text-sm truncate">
                     <div className="position-relative">
                        <img src={listing.listing.picture_url}
                             className="object-cover aspect-square rounded-4"
                             alt=""/>
                     </div>
                     <div className="fw-bold mt-2">
                        {listing.listing.public_address}
                     </div>
                     <div className="text-black-50">
                        {listing.listing.name}
                     </div>
                     <div className="mt-1">
                        <span className="font-bold">{listing.pricing_quote
                           .structured_stay_display_price.primary_line.price
                        .toLocaleString()}
                        </span> night
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
};

export default Search;

