import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';

function RentingConfirm() {
  const { carId } = useParams();
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState('');
  const [rentle, setRentle] = useState('');
  const pickupRef = useRef(null);
  const destinationRef = useRef(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const libraries = ['places'];
  const containerStyle = { width: '100%', height: '400px' };
  const center = { lat: 7.290572, lng: 80.633728 };
  const rentPerDay = selectedCar.pricePerDay; 
  const kmLimitePerDay = selectedCar.pricePerDay;
  const rentleDays = endDate - startDate;
  const totalKMLimite  = kmLimitePerDay * rentleDays;


  const calculateRoute = async () => {
    if (!pickupRef.current?.value || !destinationRef.current?.value) return;

    const service = new window.google.maps.DirectionsService();
    const results = await service.route({
      origin: pickupRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirections(results);
    const dist = results.routes[0].legs[0].distance.text;
    setDistance(dist.replace(' km', ''));
  };

  const calculateEstimatedRent = async () => {
    if(distance>totalKMLimite){
      
    }

  }

  useEffect(() => {
    const fetchSelectedCar = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/${carId}`);
        const car = response.data;

        if (car && car._id === carId) {
          setSelectedCar(car);
        } else {
          setError('Car not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch car data');
      } finally {
        setLoading(false);
      }
    };
    fetchSelectedCar();
  }, [carId]);

  if (loading) return <div className="text-white p-10">Loading car details...</div>;
  if (error) return <div className="text-red-500 p-10">{error}</div>;
  if (!selectedCar) return <div className="text-yellow-400 p-10">No car found.</div>;

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBFwQhW_8pvts6h2TEmfpXbELUbpG0eNr8"
      libraries={libraries}
    >
      <div className="h-auto bg-gray-900 pb-16">
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
            <img
              src={`http://localhost:5000/${selectedCar.images?.[0]}`}
              alt="Car image 1"
              className="row-span-2 aspect-[3/4] size-full rounded-lg object-cover max-lg:hidden"
            />
            <img
              src={`http://localhost:5000/${selectedCar.images?.[1]}`}
              alt="Car image 2"
              className="col-start-2 aspect-[3/2] size-full rounded-lg object-cover max-lg:hidden"
            />
            <img
              src={`http://localhost:5000/${selectedCar.images?.[2]}`}
              alt="Car image 3"
              className="col-start-2 row-start-2 aspect-[3/2] size-full rounded-lg object-cover max-lg:hidden"
            />
            <img
              src={`http://localhost:5000/${selectedCar.images?.[3]}`}
              alt="Car image 4"
              className="row-span-2 aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4]"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-100 sm:text-3xl">
              {selectedCar.brand}
            </h1>
            <h2 className="text-xl font-bold tracking-tight text-gray-50 sm:text-2xl">
              {selectedCar.model}
            </h2>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-3xl tracking-tight text-gray-100">
              {selectedCar.pricePerDay} Per day
            </p>

            <form className="mt-10 space-y-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-200">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-800 text-white shadow-sm h-8"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-200">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-800 text-white shadow-sm h-8"
                />
              </div>

              <div>
                <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-200">
                  Pickup Location
                </label>
                <Autocomplete>
                  <input
                    type="text"
                    ref={pickupRef}
                    id="pickupLocation"
                    placeholder="Enter pickup location"
                    className="mt-1 block w-full rounded-md bg-gray-800 text-white shadow-sm h-8"
                  />
                </Autocomplete>
              </div>

              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-200">
                  Destination
                </label>
                <Autocomplete>
                  <input
                    type="text"
                    ref={destinationRef}
                    id="destination"
                    placeholder="Enter destination"
                    className="mt-1 block w-full rounded-md bg-gray-800 text-white shadow-sm h-8"
                  />
                </Autocomplete>
              </div>

              <div>
                <label htmlFor="distance" className="block text-sm font-medium text-gray-200">
                  Estimated Distance (KM)
                </label>
                <input
                  type="text"
                  value={distance}
                  readOnly
                  className="mt-1 block w-full rounded-md bg-gray-800 text-white shadow-sm h-8"
                />
              </div>
              <div>
                <label htmlFor="rentle" className='block text-sm font-medium text-gray-200'>
                  Estimated Rentle (This amount may change based on your actual distance)
                </label>
                <input 
                type="text"
                value={rentle}
                readOnly
                className="mt-1 block w-full rounded-md bg-gray-800 text-white shadow-sm h-8" />
              </div>

              <button
                type="button"
                onClick={calculateRoute}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Show Route & Estimate Distance
              </button>

              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Pay Advance to Confirm Rent
              </button>
            </form>
          </div>
        </div>

        {/* Description and Map */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          <div className="text-gray-100 space-y-4">
            <h3 className="text-lg font-semibold">Description</h3>
            <p>{selectedCar.discription}</p>

            <h3 className="text-lg font-semibold mt-6">Tour Route</h3>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </div>
        </div>
      </div>
    </LoadScript>
  );
}

export default RentingConfirm;
