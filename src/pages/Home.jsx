//import { div } from 'framer-motion/client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import bgPlant1 from '../assets/bgPlant1.png';
import bgPlant2 from '../assets/bgPlant2.png'
//import { div } from 'framer-motion/client';
const Home = () => {
       const [plants, setPlants] = useState([]);
    useEffect(() => {
        fetch("/plants.json")
            .then((res) => res.json())
            .then((data) => setPlants(data))
            .catch((err) =>
                console.log(err)
        )
    })
    return (
     <div className='space-y-20'>
     <section className='relative'>
    <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3000 }} pagination={{ clickable: true }} loop={true} className='rounded-xl shadow-md'>
    <SwiperSlide>
    <div className='hero min-h-[70vh] bg-cover bg-center'style={{ backgroundImage: `url(${bgPlant1})` }}>
   <h1 className='text-4xl md:text-6xl font-bold drop-shadow-lg'>
 Bring Nature Home
                            </h1>
                            
                            <div className='mt-30'>
                                <div>
                                     <p className='text-2xl md:text-xl'>
 Discover beautiful indoor plants to brighten your space.
</p>
                               </div>
                                <div className='mt-4'>
                                    <Link className=' bg-green-600 py-2 px-6 rounded-md text-white font-semibold hover:bg-green-800 transition' to="/plants">
Explore plants</Link>
</div>
</div>
</div>
</SwiperSlide>
     <SwiperSlide>
          <div className='hero min-h-[70vh] bg-cover bg-center' style={{ backgroundImage: `url(${bgPlant2})` }}>
                 <h1 className='font-bold text-2xl'>Fresh Air Green Vibes</h1>
                         <div className='mt-25 '>
                            <p>Breath cleaner air with our air purifying plants.
                                    <div className='mt-3'>
                                         <Link to="/plants" className=' bg-green-500 px-3 py-2 rounded-md text-white font-semibold hover:bg-green-800 transition'>
                                    Shop Now
                                </Link> 
                                    </div>   
                        </p>
                        </div>
                        </div>
                       
 </SwiperSlide>
 </Swiper>
            </section>
            {/* plants */}
            <section className='container mx-auto px-4'>
                <h2>Your Indoor Plants</h2>

                <div className='grid gap-8 md:grid-cols-3 sm:grid-cols-2'>
                    {plants.slice(0, 6).map((plant) => (
                        <div key={plant.plantId} className='card bg-base-100 shadow hover:shadow-lg transition rounded-xl overflow-hidden'>
                            <figure className='h-60'>
                                <img src={plant.image} alt={plant.plantName} className='object-cover h-full w-full' />
                            </figure>
                            <div className='card-body'>
                                <h3 className='card-title text-green-700'>{plant.plantName}</h3>
                                <p className='text-gray-600'>${plant.price}</p>
                                <p className='text-yellow-600'>{plant.rating}</p>
                                <Link to={`/plants/${plant.plantId}`}  className='bg-green-700 p-2 font-bold text-white'>views Details</Link>
                            </div>
                            
                    </div>  
                  ))}
                </div>
            </section>
            {/* tips */}
            <section className='bg-green-500 py-10'>
                <div className='container mx-auto text-center px-4'>
                    <h1 className='text-2xl font-bold text-green-800 mb-6'>-Plants Care Tips-</h1>
                    <div className="gird md:grid-cols-3  items-center ">
                        <div className='p-6 bg-gray-600 mb-4 rounded-2xl shadow '>
                            <h3 className='font-semibold text-lg mb-2 text-yellow-400'>Sunlight</h3>
                            <p>Place your plants near windows for bright , indirect sunlight</p>

                        </div>
                        <div className='p-6  bg-gray-600 mb-4 rounded-2xl shadow'>
                            <h3 className='font-semibold text-lg mb-2 text-blue-500'>Watering</h3>
                            <p>Most Indoor plants prefer slightly most soil. Avoid overwatering</p>

                        </div>
                        <div className='p-6  bg-gray-600 mb-4 rounded-2xl shadow'>
                            <h3 className='font-semibold text-lg mb-2 text-green-200'>Fertilizing</h3>
                            <p>Use Organic fertilizing every 4-6 week for lush , green growth</p>

                        </div>
                    </div>
                </div>
            </section>
            
    </div>
    );
};

export default Home;