
import React from 'react';
import { Link } from 'react-router';
const PlantCard = ({plant}) => {
  return (
    <div className='bg-white rounded-lg shadow p-4 flex flex-col'>
      <img src={plant.image} alt="plant.plantName" className='h-40 w-full object-cover rounded' />
      <div className='mt-3 flex-1'>
        <h3 className='font-semibold text-lg'>{plant.plantName}</h3>
        <p className='text-sm text-gray-500'>{plant.category} • {plant.careLevel}</p>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className='font-medium'>${plant.price}</p>
            <p className='text-xs text-gray-600'>{plant.rating}</p>
            <Link to={`/plants/${plant.plantId}`} className='bg-green-700 text-white px-3 py-1 rounded-md text-sm'>
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
