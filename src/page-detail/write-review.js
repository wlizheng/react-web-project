import {useSelector} from "react-redux";
import React, {useState} from "react";
import axios from "axios";

const WriteReview = ({reservation, onCancelReview}) => {
   const {currentUser} = useSelector((state) => state.user);
   const [rating, setRating] = useState("");
   const [comment, setComment] = useState("");

   const handleReviewSubmit = async () => {
      if (rating < 0 || rating > 5) {
         alert("rating should within 1-5");
         return;
      }
      const createdDate = new Date();
      await axios.post('/reviews', {
         rating, comment,
         guest: currentUser._id,
         reservation: reservation._id,
         place: reservation.place._id,
         created: createdDate.toISOString(),
      });

      onCancelReview();
   };

   return (
      <div>
         <div className="">
            <input
               type="number" min="1" max="5" value={rating}
               onChange={(e) => setRating(e.target.value)}
               className="form-control mb-2"
               placeholder="Rating (1-5)"
            />

            <textarea
               value={comment}
               onChange={(e) => setComment(e.target.value)}
               className="form-control mb-2"
               placeholder="Write your review"
            />

            <button
               className="btn btn-primary float-end justify-content-center text-center"
               onClick={handleReviewSubmit}>
               submit
            </button>
         </div>
      </div>
   );
}

export default WriteReview;