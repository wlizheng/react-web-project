import React from "react";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import {MdRateReview} from "react-icons/md";
import {VscHeartFilled} from "react-icons/vsc";
import {TbSquareRoundedCheckFilled} from "react-icons/tb";
import {RiUserSmileFill} from "react-icons/ri";

const ProfileNavSideBar = () => {
   const {pathname} = useLocation();
   const [ignore, active] = pathname.split("/");
   const links = [
      {icon: <RiUserSmileFill/>, name: "profile"},
      {icon: <TbSquareRoundedCheckFilled/>, name: "reservations"},
      {icon: <MdRateReview/>, name: "reviews"},
      {icon: <VscHeartFilled/>, name: "likes"},
   ];

   return (
      <div className="list-group">
         {links.map((link) =>
            <Link
               key={link.name}
               to={`/${link.name}`}
               className={`list-group-item text-capitalize ${
                  active === link.name ? "active" : ""}`}>
               <div className="d-flex align-items-center">
                  <span className="me-1 fs-5">{link.icon}</span>
                  <span className="d-none d-lg-block">{link.name}</span>
               </div>
            </Link>
         )}
      </div>
   );
};

export default ProfileNavSideBar;