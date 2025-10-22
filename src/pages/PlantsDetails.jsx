// src/pages/PlantDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const PlantDetails = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    fetch("/plants.json")
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => String(p.plantId) === String(id));
        setPlant(found || null);
      });
  }, [id]);

  useEffect(() => {
    if (user) {
      setForm({ name: user.displayName || "", email: user.email || "" });
    }
  }, [user]);

  if (!plant) return <p className="text-center mt-10">Plant not found.</p>;

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleBook = e => {
    e.preventDefault();
    // fake booking action
    toast.success("Consultation booked successfully!");
    setForm({ name: user?.displayName || "", email: user?.email || "" });
  };

  return (
    <div className="py-6">
      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
        <img src={plant.image} alt={plant.plantName} className="w-full rounded object-cover h-80" />
        <div>
          <h2 className="text-2xl font-bold">{plant.plantName}</h2>
          <p className="text-sm text-gray-600 mt-1">{plant.category} • {plant.careLevel}</p>
          <p className="mt-4 text-gray-700">{plant.description}</p>
          <div className="mt-4">
            <p className="font-semibold">Price: ${plant.price}</p>
            <p className="text-sm">Rating: ⭐ {plant.rating}</p>
            <p className="text-sm">Stock: {plant.availableStock}</p>
            <p className="text-sm">Provider: {plant.providerName}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded shadow max-w-md">
        <h3 className="text-lg font-semibold">Book Consultation</h3>
        <form onSubmit={handleBook} className="mt-4 space-y-3">
          <div>
            <label className="text-sm">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default PlantDetails;
