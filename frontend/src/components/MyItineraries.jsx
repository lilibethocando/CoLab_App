import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const baseURL =
    process.env.NODE_ENV === 'production'
        ? 'https://colab-app.onrender.com'
        : 'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

const MyItineraries = () => {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const response = await axiosInstance.get('/itineraries');
                console.log('API Response:', response.data); // Debugging log
                setItineraries(response.data.itineraries || []);
            } catch (error) {
                console.error('There was an error fetching the itineraries!', error);
                setError('Failed to fetch itineraries');
                setItineraries([]); // Set an empty array in case of an error
            } finally {
                setLoading(false);
            }
        };

        fetchItineraries();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80" style={{ backgroundColor: '#fff', zIndex: '1000' }}>
            <div className="container px-4 mx-auto relative text-sm">
                <div className="w-full h-full bg-gray-100 p-6">
                    <div className="w-full h-24 bg-white flex items-center justify-between px-14">
                        <div className="flex items-center gap-16">
                            <div className="text-black text-2xl">My Itineraries</div>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-4">
                        {itineraries.length > 0 ? (
                            itineraries.map((itinerary, index) => (
                                <div key={index} className="bg-white p-4 shadow-md">
                                    <h2 className="text-xl font-bold">{itinerary.name}</h2>
                                    <div className="mt-2">
                                        <img
                                            src={itinerary.items.length > 0 ? itinerary.items[0].photo_url : ''}
                                            alt={itinerary.name}
                                            className="w-full h-40 object-cover"
                                        />
                                    </div>
                                    <Link to={`/itinerary/${itinerary.id}`} className="block text-center mt-2 text-blue-500 hover:underline">
                                        <div
                                            style={{
                                                width: 'fit-content',
                                                background: '#ECBB40',
                                                borderRadius: 10,
                                                padding: '5px 15px',
                                                textAlign: 'center',
                                                color: 'black',
                                                fontSize: 16,
                                                fontFamily: 'Roboto',
                                                fontWeight: '500',
                                                wordWrap: 'break-word',
                                            }}
                                        >
                                            View Itinerary
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No itineraries found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyItineraries;
