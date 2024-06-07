import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import '../index.css';

const DestinationsPage = () => {
    const navigate = useNavigate();
    const [loadedRows, setLoadedRows] = useState(0);
    const [destinations, setDestinations] = useState([
        { place: 'Colorado', img: '/colorado.jpeg' },
        { place: 'Hawaii', img: '/hawaii.jpeg' },
        { place: 'Italy', img: '/italy.jpeg' },
        { place: 'Arizona', img: '/arizona.jpeg' },
        { place: 'Mexico City', img: '/mexico.jpeg' },
        { place: 'Portugal', img: '/portugal.jpeg' },
    ]);

    const handleLoadMore = () => {
        if (loadedRows === 0) {
            // Load the first row of destinations
            const newRow = [
                { place: 'New Destination 1', img: '/new_destination_1.jpeg' },
                { place: 'New Destination 2', img: '/new_destination_2.jpeg' },
                { place: 'New Destination 3', img: '/new_destination_3.jpeg' },
            ];
            setDestinations([...destinations, ...newRow]);
            setLoadedRows(1); // Update loadedRows to 1
        } else if (loadedRows === 1) {
            // Load the second row of destinations
            const newRow = [
                { place: 'New Destination 4', img: '/new_destination_4.jpeg' },
                { place: 'New Destination 5', img: '/new_destination_5.jpeg' },
                { place: 'New Destination 6', img: '/new_destination_6.jpeg' },
            ];
            setDestinations([...destinations, ...newRow]);
            setLoadedRows(2); // Update loadedRows to 2
        } else {
            // Show sign-in message if the user clicks "Load More" again
            alert('Please sign in to load more destinations.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow" style={{ background: '#235778' }}>
                <div className="container mx-auto p-8">
                    <div className="text-white text-5xl font-semibold mb-4">
                        <h2>Popular Destinations</h2>
                    </div>
                    <div className="text-white text-2xl font-medium mb-8">
                        <h4>Explore some of the most popular places to travel</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-9">
                        {destinations.map((destination, index) => (
                            <div key={index} className="relative">
                                <img
                                    className="w-full h-56 object-cover shadow-lg"
                                    src={destination.img}
                                    alt={destination.place}
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xl font-semibold p-4">
                                    {destination.place}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-8">
                        <button onClick={handleLoadMore} style={{ display: 'flex', padding: '8px 37px', justifyContent: 'center', alignItems: 'center', gap: '10px', borderRadius: '10px', background: 'var(--Neutral, #E1E8EA)', marginTop: '45px', marginBottom: '45px' }}>
                            <div className="text-black text-base font-medium">Load More</div>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DestinationsPage;
