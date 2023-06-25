import {useEffect, useState} from "react";
import axios from "axios";
import {FcLike} from "react-icons/fc";
import {FaRegHeart} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Like = ({placeId, currentUser, initialLiked}) => {
   const [liked, setLiked] = useState(initialLiked);
   const navigate = useNavigate();

   useEffect(() => {
      const checkLikedStatus = async () => {
         try {
            const response = await axios.get(
               `/likes?placeId=${placeId}&userId=${currentUser._id}`
            );
            setLiked(response.data);
         } catch (error) {
            console.error("Error checking liked status:", error);
         }
      };
      checkLikedStatus();
   }, [placeId, currentUser]);

   const handleLike = async (event) => {
      event.preventDefault();

      if (!currentUser) {
         alert("Please login!");
         navigate("/login");
         return;
      }

      try {
         if (liked) {
            await axios.delete(`/likes`, {
               data: {place: placeId, guest: currentUser._id},
            });
         } else {
            await axios.post(`/likes`,
               {place: placeId, guest: currentUser._id});
         }
         setLiked(!liked);
      } catch (error) {
         console.error("Error handling like:", error);
      }
   };

   return (
      <button
         className="position-absolute top-2 end-2 p-2"
         onClick={handleLike}>
         {liked ? (<FcLike className="fs-3" style={{color: "white"}}/>)
            : (<FaRegHeart className="fs-3" style={{color: "white"}}/>)}
      </button>
   );
}

export default Like;