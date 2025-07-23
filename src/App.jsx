import React from "react";
import { BrowserRouter as Router,Routes,Route, useLocation } from "react-router-dom";
import "./index.css"
import Logging from "./logging/logging";
import Signin from "./newUsersign/Signin";
import BrowseCar from "./componenet/browse car/BrowseCar";
import CustomerReview from "./componenet/customer review/CustomerReview";
import Hero from "./componenet/hero/Hero";
import Navbar from "./componenet/navbar/Navbar";
import RentingConfirm from "./componenet/renting confirm page/RentingConfirm";
import InitialPage from "./pages/InitialPage";


function app() {
    // const location = useLocation();
    // const hideNavBAr = location.pathname === "/login" || location.pathname ==="/sign";
    return(
        <Router>
            {/* <Navbar /> */}
            <Routes>   
                <Route path="/" element={<InitialPage />} /> 
                <Route path="/login" element={<Logging />} />
                <Route path = "/sign" element={<Signin/>}/>
                <Route path="/hero" element={<Hero/>}/>
                <Route path = "/allVehicle" element={<BrowseCar/>}/>
                <Route path="/vehicleDetail" element={<RentingConfirm/>} />
            </Routes> 
        </Router>
    );
   
}
export default app;
