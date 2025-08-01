import React, { useState } from "react";
import axios from "axios";

const brandModelOptions = {
  Toyota: ["Corolla", "Camry", "RAV4"],
  Honda: ["Civic", "Accord", "CR-V"],
  Nissan: ["Altima", "Sentra", "X-Trail"],
  BMW: ["3 Series", "5 Series", "X5"],
};

const fuelOptions = ["Petrol", "Diesel", "Electric", "Hybrid"];
const seatOptions = [2, 4, 5, 7, 8];

const AddVehicleForm = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    fuelType: "",
    numberOfSeat: "",
    pricePerDay: "",
    kmLimitePerDay: "",
    location: "",
    pricePerAdditionalKM: "",
    additionalMessage: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length !== 4) {
      alert("Please upload exactly 4 images.");
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    images.forEach((img) => {
      data.append("images", img);
    });

    try {
      const res = await axios.get("http://localhost:5000/api/vehicles",data,{
        headers:{
            "Content-Type": "multipart/form-data",
        },
      }); 
      alert("Vehicle added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to add vehicle.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add a New Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">

        {/* Brand */}
        <div>
          <label className="block font-medium mb-1">Brand</label>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Brand</option>
            {Object.keys(brandModelOptions).map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block font-medium mb-1">Model</label>
          <select
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Model</option>
            {(brandModelOptions[formData.brand] || []).map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block font-medium mb-1">Fuel Type</label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Fuel Type</option>
            {fuelOptions.map((fuel) => (
              <option key={fuel} value={fuel}>{fuel}</option>
            ))}
          </select>
        </div>

        {/* Number of Seats */}
        <div>
          <label className="block font-medium mb-1">Number of Seats</label>
          <select
            name="numberOfSeat"
            value={formData.numberOfSeat}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Seats</option>
            {seatOptions.map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        {/* Text/Number Inputs */}
        {[
          { name: "year", label: "Year", type: "number" },
          { name: "pricePerDay", label: "Price Per Day", type: "number" },
          { name: "kmLimitePerDay", label: "KM Limit Per Day", type: "number" },
          { name: "location", label: "Location", type: "text" },
          { name: "pricePerAdditionalKM", label: "Price Per Additional KM", type: "number" },
        ].map(({ name, label, type }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ))}

        {/* Additional Message */}
        <div>
          <label className="block font-medium mb-1">Additional Message</label>
          <textarea
            name="additionalMessage"
            rows={3}
            value={formData.additionalMessage}
            onChange={handleChange}
            placeholder="Any additional notes or description..."
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">Upload 4 Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full"
            required
          />
          {images.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">{images.length} file(s) selected</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicleForm;
