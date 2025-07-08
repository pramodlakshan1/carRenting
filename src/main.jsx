import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Example from './App'
import Logging from './logging/logging'
import Signin from './newUsersign/Signin'
import Hero from './componenet/hero/Hero'
import Navba from './componenet/navbar/navbar'
import RentCalculator from './componenet/rent calculator/RentCalculator'
import TrendingCar from './componenet/trending car/TrendingCar'
import CustomerReview from './componenet/customer review/CustomerReview'
import BrowseCar from './componenet/browse car/BrowseCar'
import RentingConfirm from './componenet/renting confirm page/RentingConfirm'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Hero/>
    <TrendingCar/>
    <CustomerReview/>
     */}
     {/* <BrowseCar/> */}
     <RentingConfirm/>
  </StrictMode>,
)
