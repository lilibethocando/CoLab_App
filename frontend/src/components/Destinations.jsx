import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import '../index.css';
import philly from '../images/philly.jpeg';
import img2sav from '../images/img2sav.jpg';
import img3sa from '/washington-dc.webp';
import hawai from '/hawaii.jpeg';
import arizona from '../images/arizona.jpg';
import colorado from '../images/Colorado.jpg';
import minnesota from '/minnesota.jpeg';
import sanfrancisco from '../images/sfo.jpg';
import nashville from '../images/nashville.jpg';
import newyork from '/NYC.avif';
import miami from '/miami.jpeg';
import chicago from '../images/chicago.jpg';


const Destinations = () => {
    const navigate = useNavigate();
    const [loadedRows, setLoadedRows] = useState(0);
    const [destinations, setDestinations] = useState([
        { place: 'Philadelphia', img: philly },
        { place: 'Savannah', img: img2sav },        
        { place: 'Washington', img: img3sa },
        { place: 'Hawaii', img: hawai },
        { place: 'Arizona', img: arizona },
        { place: 'Colorado', img: colorado },
    ]);

    const handleLoadMore = () => {
        if (loadedRows === 0) {
            // Load the first row of destinations
            const newRow = [
                { place: 'Minnesota', img: minnesota },
                { place: 'San Francisco', img: sanfrancisco },
                { place: 'Nashville', img: nashville },
            ];
            setDestinations([...destinations, ...newRow]);
            setLoadedRows(1); // Update loadedRows to 1
        } else if (loadedRows === 1) {
            // Load the second row of destinations
            const newRow = [
                { place: 'New York', img: newyork },
                { place: 'Miami', img: miami },
                { place: 'Chicago', img: chicago },
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
                                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xl font-semibold p-3">
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

export default Destinations;