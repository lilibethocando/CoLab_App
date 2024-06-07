import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export const PopularDestinations = () => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/test');
    };

    return (
        <div className="w-full h-full relative p-8" style={{background: '#235778'}}>
            <div className="absolute text-white text-5xl font-semibold left-6 top-4">
                <h2>Popular Destinations</h2>
            </div>
            <div className="absolute text-white text-2xl font-medium left-6 top-20">
                <h4>Explore some of the most popular places to travel</h4> 
            </div>
            {/* Apply Tailwind classes for flexbox layout */}
            <div className="grid grid-cols-3 gap-9 absolute w-full left-0 top-48 p-8">
                {[
                    { place: 'Colorado', img: '/colorado.jpeg' },
                    { place: 'Hawaii', img: '/hawaii.jpeg' },
                    { place: 'Italy', img: '/italy.jpeg' },
                    { place: 'Arizona', img: '/arizona.jpeg' },
                    { place: 'Mexico City', img: '/mexico.jpeg' },
                    { place: 'Portugal', img: '/portugal.jpeg' },
                ].map((destination, index) => (
                    <div key={index} className="relative">
                        <img
                            className="w-full h-56 object-cover shadow-lg"
                            src={destination.img}
                            alt={destination.place}
                        />
                        <div className="absolute left-5 bottom-2 text-white text-xl font-semibold">
                            {destination.place}
                        </div>
                    </div>
                    
                ))}
                
            </div>
            <div className="flex justify-center items-end h-screen">
                <button onClick={handleButtonClick} className="px-8 py-2 bg-gray-200 rounded-lg flex justify-center items-center">
                    <div className="text-black text-xl font-medium">View More Destinations</div>
                </button>
            </div>
        </div>
        
    );
};

export default PopularDestinations;
