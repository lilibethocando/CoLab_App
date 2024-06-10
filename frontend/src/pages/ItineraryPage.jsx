import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import ItineraryHeader from "../components/ItineraryHeader";
import AddToItineraryModal from '../components/AddToItineraryModal';
import "../styles/ItineraryPage.css";

// Create an Axios instance with the required configuration
const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://colab-app.onrender.com' : 'http://localhost:5000',
    withCredentials: true,
});

const ItineraryPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    // Check if the user is logged in and redirect to sign-in if not
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axiosInstance.get('/current_user');
                if (response.data.id) {
                    setIsLoggedIn(true);
                } else {
                    navigate('/signin');
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                navigate('/signin');
            }
        };

        checkLoginStatus();
    }, [navigate]);

    // Handle changes in the search input field
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle the submission of the search form
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post('/itinerary_search', { city: searchTerm });
            console.log('Response:', response.data);
            if (response.data && response.data.places) {
                setPlaces(response.data.places);
            } else {
                console.error('Invalid response data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching popular destinations:', error);
        }
        setLoading(false);
    };

    // Handle the "Add to Itinerary" button click
    const handleAddToItinerary = async (place) => {
        try {
            const response = await axiosInstance.get('/current_user');
            console.log('Current user:', response.data);

            if (!response.data.id) {
                console.log('User is not authenticated');
                navigate('/signin');
                return;
            }

            setSelectedPlace(place);

                // Attempt to fetch itineraries
            try {
                const itinerariesResponse = await axiosInstance.get('/itineraries');
                console.log('Fetched itineraries:', itinerariesResponse.data.itineraries);
                setShowModal(true);
                console.log('Selected place name:', place.name);
            } catch (error) {
                console.error('Error fetching itineraries:', error.response?.status, error.response?.data);
            }
        } catch (error) {
            console.error('Error fetching current user:', error.response?.status, error.response?.data);
        }
    };

    return (
        <div>
            <SecondNavbar />
            <ItineraryHeader />
            <div className="content-container">
                <div className="search-container">
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search city"
                            className="search-input"
                        />
                    </form>
                </div>
                <div className="search-filter-container">
                    <div className="filter-container">
                        <div className="dropdown">
                            <button className="dropbtn">Arts & Culture <span className="arrow-down">&#9660;</span></button>
                            <div className="dropdown-content">
                                <input type="checkbox" id="museums" name="museums" value="museums" />
                                <label htmlFor="museums">Museums</label><br />
                                <input type="checkbox" id="artGalleries" name="artGalleries" value="artGalleries" />
                                <label htmlFor="artGalleries">Art Galleries</label><br />
                                <input type="checkbox" id="theatre" name="theatre" value="theatre" />
                                <label htmlFor="theatre">Theatre</label><br />
                                <input type="checkbox" id="historicalMonuments" name="historicalMonuments" value="historicalMonuments" />
                                <label htmlFor="historicalMonuments"> Monuments</label><br />
                                <input type="checkbox" id="tours" name="tours" value="tours" />
                                <label htmlFor="tours">Tours</label>
                            </div>
                        </div>
                    </div>
                    <div className="filter-container">
                        <div className="dropdown">
                            <button className="dropbtn">Outdoors <span className="arrow-down">&#9660;</span></button>
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
                    <div className="filter-container">
                        <div className="dropdown">
                            <button className="dropbtn">Food & Drink <span className="arrow-down">&#9660;</span></button>
                            <div className="dropdown-content">
                                <input type="checkbox" id="breweries" name="breweries" value="breweries" />
                                <label htmlFor="breweries">Breweries</label><br />
                                <input type="checkbox" id="wineries" name="wineries" value="wineries" />
                                <label htmlFor="wineries">Wineries</label><br />
                                <input type="checkbox" id="coffee-shops" name="coffee-shops" value="coffee-shops" />
                                <label htmlFor="coffee-shops">Coffee Shops</label><br />
                                <input type="checkbox" id="restaurants" name="restaurants" value="restaurants" />
                                <label htmlFor="restaurants">Restaurants</label>
                            </div>
                        </div>
                    </div>
                    <div className="filter-container">
                        <div className="dropdown">
                            <button className="dropbtn">Day/Night <span className="arrow-down">&#9660;</span></button>
                            <div className="dropdown-content">
                                <input type="checkbox" id="day" name="day" value="day" />
                                <label htmlFor="day">Day</label><br />
                                <input type="checkbox" id="afternoon" name="afternoon" value="afternoon" />
                                <label htmlFor="afternoon">Afternoon</label><br />
                                <input type="checkbox" id="night" name="night" value="night" />
                                <label htmlFor="night">Night</label><br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="itinerary-grid">
                {places.slice(0, 6).map((place, index) => (
                    <div key={index} className="itinerary-grid-item">
                        <div className="place-item">
                            <button className="add-button" onClick={() => handleAddToItinerary(place)}>Add to Itinerary</button>
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
            <AddToItineraryModal
                show={showModal}
                onClose={() => setShowModal(false)}
                place={selectedPlace}
            />
            <Footer />
        </div>
    );
};

export default ItineraryPage;
