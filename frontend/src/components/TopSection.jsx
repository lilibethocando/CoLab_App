import React from 'react';
import { Link } from 'react-router-dom';

export const TopSection = () => {
    const handleGetStarted = () => {
        console.log('Get Started');
    };

    return (
        <div className="flex mb-20"> 
            <div className="w-1/2 h-full bg-white flex flex-col items-start justify-start p-10">
                <div className="text-black font-roboto">
                    <h1 className="text-5xl font-bold leading-tight mb-4">Plan Your Dream Trip with <br/> TripPlanner</h1>
                    <p className="text-xl leading-6">Create your ideal itinerary and plan a <br/> trip with ease</p>
                </div>
                <div className="mt-10">
                    <Link to="/signin">
                        <button className="py-2 px-6 text-white font-medium rounded-lg border-transparent" style={{ background: '#235778' }}>
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
            <img src="/landing_main.png" alt="image" className="w-1/2 object-cover"/>
        </div>
    );
};

export default TopSection;
