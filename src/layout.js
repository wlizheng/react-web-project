import {Outlet} from "react-router-dom";
import Header from "./page-home/header";

const Layout = () => {
   return (
      <div className="container">
         <Header/>
         <Outlet/>
      </div>
   );
};

export default Layout;