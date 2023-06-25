import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginThunk} from "../services/auth-thunks";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleLogin = async (e) => {
      e.preventDefault(); // will not reload the page
      try {
         await dispatch(loginThunk({email, password}));
         navigate("/");
      } catch (error) {
         alert(error);
      }
   }

   return (
      <div className="container">
         <div className="row justify-content-center align-items-center vh-100">
            <div className="col-md-4 mb-64">
               <form onSubmit={handleLogin}>
                  <h2 className="text-center mb-3">Login</h2>
                  <input
                     className="wb-form"
                     type="email"
                     placeholder="Email"
                     value={email}
                     onChange={(event) => setEmail(event.target.value)}
                  />
                  <input
                     className="wb-form"
                     type="password"
                     placeholder="Password"
                     value={password}
                     onChange={(event) => setPassword(event.target.value)}
                  />
                  <button
                     className="bg-[#ff5160] fw-semibold text-white wb-form">
                     Login
                  </button>
                  <div className="text-center text-black-50 mt-1">
                     Don't have an account?{" "}
                     <Link to={"/signup"} className="text-secondary fw-bold">
                        Register here
                     </Link>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};
export default Login;