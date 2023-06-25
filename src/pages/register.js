import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {registerThunk} from "../services/auth-thunks";

const Register = () => {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [role, setRole] = useState("guest");
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleRegister = async (event) => {
      event.preventDefault();
      try {
         await dispatch(registerThunk({username, email, password, role}));
         navigate("/login");
      } catch (error) {
         alert(error);
      }
   }

   return (
      <div className="container">
         <div className="row justify-content-center align-items-center vh-100">
            <div className="col-md-4 mb-64">
               <form onSubmit={handleRegister}>
                  <h2 className="text-center mb-4">Register</h2>
                  <input className="wb-form" type="text" placeholder="username"
                         value={username}
                         onChange={(event) => setUsername(event.target.value)}/>
                  <input className="wb-form" type="email"
                         placeholder="youremail@email.com" value={email}
                         onChange={(event) => setEmail(event.target.value)}/>
                  <input className="wb-form" type="password"
                         placeholder="password" value={password}
                         onChange={(event) => setPassword(event.target.value)}/>

                  <div className="text-center p-2">
                     <label className="form-check-label me-5">
                        <input
                           className="form-check-input"
                           type="radio"
                           value="host"
                           checked={role === "host"}
                           onChange={() => setRole("host")}
                        />
                        Host
                     </label>
                     <label className="form-check-label me-5">
                        <input
                           className="form-check-input"
                           type="radio"
                           value="guest"
                           checked={role === "guest"}
                           onChange={() => setRole("guest")}
                        />
                        Guest
                     </label>
                     <label className="form-check-label">
                        <input
                           className="form-check-input"
                           type="radio"
                           value="admin"
                           checked={role === "admin"}
                           onChange={() => setRole("admin")}
                        />
                        Admin
                     </label>
                  </div>

                  <button
                     className="bg-[#ff5160] fw-semibold text-white wb-form"
                     type="submit">
                     Register
                  </button>
                  <div className="text-center text-black-50 mt-1">
                     Already have an account? <Link to={'/login'}
                                                    className="text-secondary fw-bold">
                     Log in here</Link>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};
export default Register;