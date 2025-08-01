import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Vehicle from "../../../../server/models/Vehicle";

export default function BrowseCar() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 12;

  // Fetch vehicles from MongoDB
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/vehicles");
        setVehicles(response.data);
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = vehicles.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(vehicles.length / carsPerPage);

  const handleRentingConfirm = (id) => {
    navigate(`/vehicleDetail/${id}`);
    console.log("Navigate to vehicle id", id);
    
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 ">
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pl-2">
        {currentCars.map((car) => (
          <div
            key={car._id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <div>
              <img
                className="p-8 rounded-t-lg object-cover w-full h-48"
                src={`http://localhost:5000/${car.images?.[0]}`}
                alt={car.model}
              />
            </div>
            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {car.brand} {car.model}
              </h5>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Fuel: {car.fuelType} | Seats: {car.numberOfSeat}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  Rs {car.pricePerDay} / day
                </span>
                <button
                  onClick={() => handleRentingConfirm(car._id)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                   focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Rent Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
