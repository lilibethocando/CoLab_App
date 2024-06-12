import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function App() {
    return (
        <footer className="flex flex-col items-center justify-center">
            <div className="flex items-center" style={{ height: '41.79px' }}>
                <img
                    className="w-14"
                    src={logo}
                    alt="Logo"
                />
                <div className="text-black font-roboto text-2xl font-bold ml-4">
                    TripPlanner
                </div>
            </div>
            <div className="flex justify-center items-center gap-6 mt-6">
                <Link to="/">
                <span className="text-black font-roboto text-lg">Home</span>
                </Link>
                <div className="text-black text-base font-roboto">|</div>
                <Link to="/itinerary" className="text-black text-base font-roboto">
                <span className="text-black font-roboto text-lg">Plan a Trip</span>
                </Link>
                <div className="text-black text-base font-roboto">|</div>
                <Link to="/myitineraries">
                <span className="text-black font-roboto text-lg">Itineraries</span>
                </Link>
                <div className="text-black text-base font-roboto">|</div>
                <Link to="/">
                <span className="text-black font-roboto text-lg">About</span>
                </Link>
            </div>

            <div
                className="text-center text-black font-roboto text-xl font-medium leading-6 mt-4"
                style={{ width: '787px' }}
            >
                Plan your dream trip with ease.
            </div>

            <div className="w-full bg-white text-center py-4">
                <div className="text-black font-sans text-lg">
                    © 2024 COLAB29 | Powered by colab29
                </div>
            </div>
        </footer>
    );
}

export default App;
