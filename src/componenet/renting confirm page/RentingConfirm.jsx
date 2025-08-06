import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { data, useParams } from 'react-router-dom';
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfDays, setDays] = useState(null);


  const libraries = ['places'];
  const containerStyle = { width: '100%', height: '400px' };
  const center = { lat: 7.290572, lng: 80.633728 };
  const rentPerDay = selectedCar?.pricePerDay ||0; 
  const kmLimitePerDay = selectedCar?.kmLimitePerDay || 0;
  const pricePerAdditionalKM = selectedCar?.pricePerAdditionalKM || 0;
  const rentleDays = endDate - startDate;
  // const totalKMLimite  = kmLimitePerDay * rentleDays;


  const calculateRoute = async () => {
  if (!pickupRef.current?.value || !destinationRef.current?.value) return;

  const service = new window.google.maps.DirectionsService();
  const results = await service.route({
    origin: pickupRef.current.value,
    destination: destinationRef.current.value,
    travelMode: window.google.maps.TravelMode.DRIVING,
  });

  setDirections(results);
  
  const distText = results.routes[0].legs[0].distance.text;
  const oneWayDistance = parseFloat(distText.replace(' km', ''));
  const totalDistance = oneWayDistance * 2;
  setDistance(totalDistance.toFixed(2)); // for display

  // const estimatedRent = await calculateEstimatedRent(totalDistance);
  // console.log("Estimated Rent:", estimatedRent);
  // setRentle(estimatedRent); // shows in UI
  

};
const calculateNumberOfDays = () => {
  if (startDate && endDate){
    const start = new Date(startDate);
    const end = new Date(endDate);

    const timediff = Math.abs(end-start);
    const daysDiff = Math.ceil(timediff / (1000 *3600 *24));
    setDays(daysDiff);

  }else{
    alert('Please provide a Tour Start and End date corectly!!')
  }
}

const calculateEstimatedRent = (dist, numberOfDays) => {
  
  
  if (isNaN(dist) || numberOfDays <= 0) return 0;

  const totalKMLimite = kmLimitePerDay * numberOfDays;
  const baseRent = rentPerDay * numberOfDays;

  if (dist > totalKMLimite) {
    const extraDistance = dist - totalKMLimite;
    const extraCharge = extraDistance * pricePerAdditionalKM;
    return baseRent + extraCharge;
  }

  return baseRent;
};


const handleCalculateAll = async () => {
  await calculateRoute(); // Sets distance

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (!startDate || !endDate || end < start) {
    alert("Please provide valid dates");
    return;
  }
  const daysDiff = Math.ceil((end - start) / (1000 * 3600 * 24));
  setDays(daysDiff); // still set state
  console.log("Calculated Days:", daysDiff);

  const estimatedRent = await calculateEstimatedRent(parseFloat(distance), daysDiff);
  console.log("Estimated Rent:", estimatedRent);
  setRentle(estimatedRent);
};
const handleConfirmRent = async => {
  try {
    const res = await axios.post("http://localhost:5000/api/rents",data)
  } catch (error) {
    
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
            <p>{selectedCar.discription}</p>
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
                  // id="startDate"
                  value={startDate}
                  name="startDate"
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-800 text-white shadow-sm h-8"
                />
              </div>

              <div>
                <label htmlFor="endDate " className="block text-sm font-medium text-gray-200">
                  End Date
                </label>
                <input
                  type="date"
                  // id="endDate"
                  value={endDate}
                  name="endDate"
                  onChange={(e) => setEndDate(e.target.value)}
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
                <label htmlFor="numberOfDays" className="block text-sm font-medium text-gray-200">
                  Number of days
                </label>
                <input type="numberOfDays"
                id='days'
                value={numberOfDays}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-500 bg-gray-800 text-white shadow-sm h-8" />
              </div>
              {/* <button
                type="button"
                onClick={calculateNumberOfDays}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                calculate number of days
              </button> */}

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
                value={rentle !== '' ? `Rs. ${rentle}` : ''}
                readOnly
                className="mt-1 block w-full rounded-md bg-gray-800 text-white shadow-sm h-8" />
              </div>

              <button
                type="button"
                onClick={handleCalculateAll}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Show Route & Estimate Distance
              </button>

              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Confirm Rent
              </button>
              
              
            </form>
            {/* <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16"> */}

            
          {/* </div> */}
          </div>
            {/* Left side: Description + Map */}
                <div className="lg:col-span-2 text-gray-100 space-y-4"> <h3 className="text-lg font-semibold mt-6">Tour Route</h3>
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
