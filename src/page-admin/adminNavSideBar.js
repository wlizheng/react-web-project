import {useLocation} from "react-router";
import {TbSquareRoundedCheckFilled} from "react-icons/tb";
import {Link} from "react-router-dom";
import React from "react";
import {BsFillHouseFill} from "react-icons/bs";

const AdminNavSideBar = () => {
   const {pathname} = useLocation();
   const [ignore, admin, active] = pathname.split("/");
   const links = [
      {icon: <BsFillHouseFill/>, name: "places"},
      {icon: <TbSquareRoundedCheckFilled/>, name: "reservations"},
   ];

   return (
      <div className="list-group">
         {links.map((link) =>
            <Link
               key={link.name}
               to={`/admin/${link.name}`}
               className={`list-group-item text-capitalize ${
                  active === link.name ? "active" : ""}`}>
               <div className="d-flex align-items-center">
                  <span className="me-2 fs-5">{link.icon}</span>
                  <span className="d-none d-xl-block">{link.name}</span>
               </div>
            </Link>
         )}
      </div>
   );
};

export default AdminNavSideBar;