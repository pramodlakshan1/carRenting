import React from "react";
import Navbar from "../componenet/navbar/Navbar";
import Hero from "../componenet/hero/Hero";
import CustomerReview from "../componenet/customer review/CustomerReview";
import TrendingCar from "../componenet/trending car/TrendingCar";

const InitialPage = () => {

    return (
        <>
            <Navbar />
            <Hero/>
            <TrendingCar/>
            <CustomerReview/>

        </>
    );

};

export default InitialPage;