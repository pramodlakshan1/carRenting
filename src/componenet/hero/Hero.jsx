import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Hero() {

  const navigate = useNavigate();

  const handleAllCar = () =>{
    navigate("/allVehicle")
  }

  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* TEXT SIDE */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Rent your perfect car in seconds
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Explore luxury, economy, and everything in between. No hidden charges, instant booking, and 24/7 support.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Book Now
              </a>
              <a href="#" className="text-sm font-semibold text-gray-900 dark:text-white"
                onClick={handleAllCar}
              >
                Browse Cars <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* IMAGE TILES SIDE */}
          <div className="grid grid-cols-2 gap-6 lg:gap-8">
            <div className="grid gap-6">
              <img
                src="https://carfromjapan.com/wp-content/uploads/2022/02/meritt-thomas-SWt1dHle1eA-unsplash.jpg"
                alt=""
                className="rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md w-full h-48 object-cover"
              />
              <img
                src="https://assets.nexuspointapex.co.uk/tenant_ff5dd0aaad1c44e6909d6ce92e6670c4/media/uploads/mercedes-head-image.png"
                alt=""
                className="rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md w-full h-48 object-cover"
              />
            </div>
            <div className="grid gap-6 mt-12">
              <img
                src="https://www.irishexaminer.com/cms_media/module_img/5343/2671550_5_articleinlinemobile_2.62605618_1_.jpg"
                alt=""
                className="rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md w-full h-48 object-cover"
              />
              <img
                src="https://i.ytimg.com/vi/hOP1cIwhZaQ/sddefault.jpg"
                alt=""
                className="rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
