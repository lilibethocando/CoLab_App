import React, { useState } from 'react';
import axios from 'axios';
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import ItineraryHeader from "../components/ItineraryHeader";
import Modal from "../components/modal"; // Adjust the casing here
import "../styles/ItineraryPage.css";

const ItineraryPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false); // State variable to control the visibility of the modal

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:5000/itinerary_search', { city: searchTerm });
            console.log('Response:', response.data); 
            setPlaces(response.data.places);
        } catch (error) {
            console.error('Error fetching popular destinations:', error);
        }
        setLoading(false);
    };

    const handleCloseModal = () => {
      setShowModal(false);
  };
  
    const handleAddToItinerary = () => {
        console.log("Add to Itinerary button clicked");
        setShowModal(true); 
        console.log("showModal state:", showModal);
    };
  
    return (
        <div>
            <SecondNavbar />
            <ItineraryHeader />
            <div className="search-container">
                {/* Use onSubmit on the form element */}
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search city"
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>
            <div className="search-filter-container">
                <div className="filter-container">
                    <div className="dropdown">
                        <button className="dropbtn">Arts & Culture</button>
                        <div className="dropdown-content">
                            <input type="checkbox" id="museums" name="museums" value="museums" />
                            <label htmlFor="museums">Museums</label><br />
                            <input type="checkbox" id="artGalleries" name="artGalleries" value="artGalleries" />
                            <label htmlFor="artGalleries">Art Galleries</label><br />
                            <input type="checkbox" id="theatre" name="theatre" value="theatre" />
                            <label htmlFor="theatre">Theatre</label><br />
                            <input type="checkbox" id="historicalMonuments" name="historicalMonuments" value="historicalMonuments" />
                            <label htmlFor="historicalMonuments">Historical Monuments</label>
                        </div>
                    </div>
                </div>
                <div className="filter-container">
                    <div className="dropdown">
                        <button className="dropbtn">Outdoors</button>
                        <div className="dropdown-content">
                            <input type="checkbox" id="camping" name="camping" value="camping" />
                            <label htmlFor="camping">Camping</label><br />
                            <input type="checkbox" id="park" name="park" value="park" />
                            <label htmlFor="park">Park</label><br />
                            <input type="checkbox" id="trail" name="trail" value="trail" />
                            <label htmlFor="trail">Trail</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="itinerary-grid">
                {places.slice(0, 6).map((place, index) => (
                    <div key={index} className="itinerary-grid-item">
                        <div className="place-item">
                            <button className="add-button" onClick={handleAddToItinerary}>Add to Itinerary</button> {/* Attach onClick event handler */}
                            {place.photo_url ? (
                                <img src={place.photo_url} alt={place.name} />
                            ) : (
                                <div>No Image Available</div>
                            )}
                        </div>
                        <h3>{place.name}</h3>
                    </div>
                ))}
            </div>
            {/* Render modal conditionally */}
            {showModal && <Modal show={true} onClose={() => setShowModal(false)} />} 

            <Footer />
        </div>
    );
};

export default ItineraryPage;
