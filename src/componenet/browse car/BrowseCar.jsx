import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // ✅ Correct hook


const cars = [
  {
    id: 1,
    brand: "BMW",
    model: "BMW 520d",
    price: "20000 Rs Per day",
    image: "https://purepng.com/public/uploads/large/purepng.com-blue-bmw-m2-coupe-carcarbmwvehicletransport-961524661932j9nsh.png"
  },
  {
    id: 2,
    brand: "Audi",
    model: "Audi A6",
    price: "22000 Rs Per day",
    image: "https://www.pngarts.com/files/11/Expensive-Audi-A6-PNG-Download-Image.png"
  },
  {
    id: 3,
    brand: "Mercedes",
    model: "Mercedes C-Class",
    price: "25000 Rs Per day",
    image: "https://www.pngkey.com/png/detail/772-7723571_2019-mercedes-benz-c-class-sedan-hero-image.png"
  },
  {
    id: 4,
    brand: "Tesla",
    model: "Tesla Model S",
    price: "30000 Rs Per day",
    image: "https://www.pngarts.com/files/11/Expensive-Audi-A6-PNG-Download-Image.png"
  },
  {
    id: 5,
    brand: "Toyota",
    model: "Toyota Prius",
    price: "18000 Rs Per day",
    image: "https://www.pngarts.com/files/11/Expensive-Audi-A6-PNG-Download-Image.png"
  },
  {
    id: 6,
    brand: "Toyota",
    model: "Toyota Prius",
    price: "18000 Rs Per day",
    image: "https://www.pngarts.com/files/11/Expensive-Audi-A6-PNG-Download-Image.png"
  },
  {
    id: 7,
    brand: "Honda",
    model: "Honda Civic",
    price: "19000 Rs Per day",
    image: "https://www.pngarts.com/files/11/Expensive-Audi-A6-PNG-Download-Image.png"
  },
  // You can add more cars here to test pagination
];

export default function BrowseCar() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);


  const totalPages = Math.ceil(cars.length / carsPerPage);

  const handleRentingConfirm = () => {
    navigate("/vehicleDetail")
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentCars.map((car) => (
          <div
            key={car.id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={car.image}
                alt={car.model}
              />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {car.brand} {car.model}
                </h5>
              </a>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {car.price}
                </span>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                   focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleRentingConfirm}
                >
                  Rent Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
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
