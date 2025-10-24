import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { TbHeartStar } from 'react-icons/tb';

const PlantsDetails = () => {
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
      })
  }, [id]);
  useEffect(() => {
    if(user){
      setForm({ name: user.displayName || "", email: user.email || "" });
    }
  }, [user]);
  if (!plant) return <p className='text-center mt-10 '> Plant Not Found</p>
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleBook = e => {
    e.preventDefault();
    toast.success("Consultation booked Succedfully");
    setForm({  name:"", email: "" });
  }

  return (
    <div className='py-6'>
      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
        <img src={plant.image} alt={plant.plantName} className='w-full rounded object-cover h-80' />
        <div>
          <h2 className='text-2xl font-bold text-green-500'>{plant.plantName}</h2>
          
          <p className='text-sm text-gray-700 mt-1 font-bold'>{plant.category} . { plant.careLevel}</p>
          <p className='mt-1 font-bold text-gray-600'>{plant.description}</p> 
          <div>
            <p className='font-bold'>price: ${plant.price }</p>
            <p className='flex font-bold mx-auto justify-center items-center'>rating:<TbHeartStar className='text-yellow-700' />
{ plant.rating}</p>
            <p className='font-bold'>Sotck:{plant.availableStock}</p>
            <p className='font-bold '>Provider:{ plant.providerName}</p>
          </div>
        </div>
      </div>
      {/* booked */}
      <div className='mt-6 bg-white shadow max-w-md mx-auto'>
        <h3 className='text-lg font-bold '>Book Consultation</h3>
        <form onSubmit={handleBook} className='mt-4 space-y-3'>
          <div>
            <label className='text-sm'>Name</label>
            <input name='name' value={form.name} onChange={handleChange} className='w-full border rounded px-3 py-2 ' required/>
          </div>
          <div>
            <label className='text-sm'>Email</label>
            <input name='email' value={form.email} onChange={handleChange} className='w-full border rounded px-3 py-2 ' required/>
          </div>
          <button className='bg-green-600 text-white px-4 py-2 rounded-2xl mb-2 hover:bg-green-800'>Book Now</button>
        </form>
      </div>

    </div>
  );
};

export default PlantsDetails;

