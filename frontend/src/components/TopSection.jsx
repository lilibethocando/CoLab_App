import React from 'react';
import { Link } from 'react-router-dom';

export const TopSection = () => {
    const handleGetStarted = () => {
        console.log('Get Started');
    };

    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            {/* Big white box */}
            <div className="w-full h-full bg-white shadow-md rounded-lg overflow-hidden">
                {/* Gray box */}
                <div className="w-1/2 h-full bg-gray-100 flex flex-col items-start justify-start p-10">
                    <div className="text-black font-roboto">
                        <h1 className="text-5xl font-bold leading-tight mb-4">Plan Your Dream Trip with TripPlanner</h1>
                        <p className="text-xl leading-6">Create your ideal itinerary and plan a trip with ease</p>
                    </div>
                    <div className="mt-10">
                        <Link to="/signin">
                            <button className="py-3 px-6 bg-blue-800 text-white font-medium rounded-lg border-transparent">Get Started</button>

                        </Link>
                    </div>
                </div>
                {/* White content box */}
                <div className="w-1/2 h-full flex items-center justify-center">
                    {/* Your content for the white box goes here */}
                </div>
            </div>
        </div>
    );
};

export default TopSection;
