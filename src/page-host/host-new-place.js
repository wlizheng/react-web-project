import React, {useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const HostNewPlace = () => {
   const {currentUser} = useSelector((state) => state.user);
   const [title, setTitle] = useState("");
   const [address, setAddress] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState(300);
   const [checkIn, setCheckIn] = useState("");
   const [checkOut, setCheckOut] = useState("");
   const [maxGuests, setMaxGuests] = useState(1);
   const [uploadLink, setUploadLink] = useState([]);
   const [addPhoto, setAddPhoto] = useState("");
   const navigate = useNavigate();

   const addLink = (e) => {
      e.preventDefault();
      if (addPhoto) {
         setUploadLink([...uploadLink, addPhoto]);
         setAddPhoto("");
      }
   }

   const handleSave = async (e) => {
      e.preventDefault();
      if (!currentUser) {
         alert("Please login!");
         navigate("/login");
         return;
      }

      await axios.post('/places', {
         title, address, description,
         price, checkIn, checkOut,
         maxGuests,
         photos: uploadLink,
         owner: currentUser._id,
      });
      navigate('/host');
   }

   return (
      <div className="container mt-3">
         <h4 className="text-center mb-4">Host new place</h4>
         <form className="mb-5" onSubmit={handleSave}>
            <h5>Place Title</h5>
            <input type="text" value={title}
                   onChange={e => setTitle(e.target.value)}
                   placeholder="title"
                   className="wb-form mb-3"/>
            <h5>Place Address</h5>
            <input type="text" value={address}
                   onChange={e => setAddress(e.target.value)}
                   placeholder="address" className="wb-form mb-3"/>
            <h5>Place Description</h5>
            <textarea value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="description" className="wb-form mb-3"/>
            <h5>Place Photos</h5>
            <div className="mb-3 wb-form align-items-center">
               <input type="text" value={addPhoto}
                      onChange={e => setAddPhoto(e.target.value)}
                      placeholder="upload photo by link"
                      className="mb-3 outline-0 align-items-center col-10 col-lg-11"/>
               <button onClick={addLink}
                       className="btn btn-outline-primary float-end fw-bold">
                  Add
               </button>
               <div className="row">
                  {uploadLink.length > 0 && uploadLink.map(link => (
                     <div className="col-2">
                        <img src={link}
                             className="object-cover aspect-square rounded-4 mb-2"
                             alt=""/>
                     </div>
                  ))}
               </div>
            </div>
            <h5>Place Price</h5>
            <input type="number" value={price}
                   onChange={e => setPrice(e.target.value)}
                   placeholder="price / night"
                   className="wb-form mb-3"/>
            <h5>CheckIn</h5>
            <input type="text" value={checkIn}
                   onChange={e => setCheckIn(e.target.value)}
                   placeholder="checkIn time" className="wb-form mb-3"/>
            <h5>CheckOut</h5>
            <input type="text" value={checkOut}
                   onChange={e => setCheckOut(e.target.value)}
                   placeholder="checkOut time" className="wb-form mb-3"/>
            <h5>Maximum Guests</h5>
            <input type="number" value={maxGuests}
                   onChange={e => setMaxGuests(e.target.value)}
                   placeholder="maximum guests"
                   className="wb-form mb-3"/>
            <button className="wb-form btn btn-primary fw-bold">
               Save
            </button>
         </form>

      </div>
   );
};
export default HostNewPlace;