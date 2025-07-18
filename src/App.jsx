import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import "./index.css"
import Logging from "./logging/logging";
import Signin from "./newUsersign/Signin";
import BrowseCar from "./componenet/browse car/BrowseCar";
import CustomerReview from "./componenet/customer review/CustomerReview";
import Hero from "./componenet/hero/Hero";
import Navbar from "./componenet/navbar/navbar";
import RentingConfirm from "./componenet/renting confirm page/RentingConfirm";


function app() {
    return(
        <Router>
            <Navbar />
            <Routes>   
                <Route path="/" element={<Hero />} /> 
                <Route path="/login" element={<Logging />} />
                <Route path = "/sign" element={<Signin/>}/>
                <Route path="/hero" element={<Hero/>}/>
            </Routes> 
        </Router>
    );
   
}
export default app;
