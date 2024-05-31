import React from 'react';
import '../index.css';

export const PopularDestinations = () => {
    return (
        <div className="w-full h-full relative bg-blue-900 p-8">
            <div className="absolute text-white text-5xl font-semibold left-6 top-4">
                Popular Destinations
            </div>
            <div className="absolute text-white text-2xl font-medium left-6 top-20">
                Explore some of the most popular places to travel
            </div>
            <div className="absolute left-2/3 top-3/4 flex justify-start items-start">
                <div className="px-8 py-4 bg-gray-200 rounded-lg flex justify-center items-center">
                    <div className="text-black text-xl font-medium">View More Destinations</div>
                </div>
            </div>
            {/* Apply Tailwind classes for flexbox layout */}
            <div className="grid grid-cols-3 gap-9 absolute w-full left-6 top-56">
                {[
                    { place: 'Colorado', img: '../assets/colorado.jpeg' },
                    { place: 'Hawaii', img: '/assets/hawaii.jpeg' },
                    { place: 'Italy', img: '../assets/italy.jpeg' },
                    { place: 'Arizona', img: '../assets/arizona.jpeg' },
                    { place: 'Mexico City', img: '../assets/mexico.jpeg' },
                    { place: 'Portugal', img: '../assets/portugal.jpeg' },
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
        </div>
    );
};

export default PopularDestinations;
