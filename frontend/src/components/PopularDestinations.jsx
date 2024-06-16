import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export const PopularDestinations = () => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/destinations');
    };

    return (
        <div className="w-full relative p-8" style={{ background: '#235778', height: '80vh' }}>
            <div className="absolute text-white text-5xl font-semibold left-6 top-6">
                <h2>Popular Destinations</h2>
            </div>
            <div className="absolute text-white text-2xl font-medium left-6 top-20">
                <h4>Explore some of the most popular places to travel</h4>
            </div>
            <div className="grid grid-cols-3 gap-9 absolute w-full left-0 top-32 p-8">
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
                            className="w-full h-56 object-cover shadow-lg rounded-lg"
                            src={destination.img}
                            alt={destination.place}
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xl font-semibold p-3">
                            {destination.place}
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 w-full flex justify-center">
                <button onClick={handleButtonClick} className="px-8 py-2 bg-gray-200 rounded-md flex justify-center items-center mb-4">
                    <div className="text-black text-base font-medium">View More Destinations</div>
                </button>
            </div>
        </div>
    );
};

export default PopularDestinations;
