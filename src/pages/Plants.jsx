import React, { useEffect, useState } from 'react';
import PlantCard from '../components/PlantCard';

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((err) => console.log(err));
  }, []);
  const filtered = plants.filter(p =>
    p.plantName.toLowerCase().includes(search.trim().toLowerCase())
  );
  return (
    <div className='py-6'>
      <h2 className='font-bold text-green-700 text-2xl'>--All Plants--</h2>
      <div className='mt-4 flex items-center gap-4'>
       <input value={search} onChange={(e)=> setSearch(e.target.value)} className='border rounded-2xl px-3 py-2 w-full md:w-1/2' placeholder='Search your plants'/>
      </div>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
        {filtered.map(p => <PlantCard key={p.plantId} plant={p } />)}
      </div>
    </div>
  );
};

export default Plants;

