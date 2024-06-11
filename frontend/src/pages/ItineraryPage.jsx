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
    const [searchTerm, setSearchTerm] = useState(''); // State for storing the search term input by the user
    const [selectedPlace, setSelectedPlace] = useState(null); // State for storing the selected place
    const [places, setPlaces] = useState([]); // State for storing the search results (places)
    const [loading, setLoading] = useState(false); // State for indicating whether a search request is in progress
    const [showModal, setShowModal] = useState(false); // State for controlling the visibility of the modal
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State for storing the login status of the user

    const navigate = useNavigate(); // Hook for programmatic navigation

    // Check if the user is logged in and redirect to sign-in if not
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axiosInstance.get('/current_user');
                if (response.data.id) {
                    setIsLoggedIn(true); // Set isLoggedIn to true if the user is logged in
                } else {
                    navigate('/signin'); // Redirect to sign-in if the user is not logged in
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                navigate('/signin'); // Redirect to sign-in if an error occurs
            }
        };

        checkLoginStatus(); // Call the function to check the login status
    }, [navigate]); // Run this effect only once when the component mounts

    // Handle changes in the search input field
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update the searchTerm state with the new input value
    };

    // Handle the submission of the search form
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post('/itinerary_search', { city: searchTerm });
            console.log('Response:', response.data);
            if (response.data && response.data.places) {
                setPlaces(response.data.places); // Update the places state with the data from the server response
            } else {
                console.error('Invalid response data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching popular destinations:', error);
        }
        setLoading(false);
    };

    // Handle the "Add to Itinerary" button click
    // Handle the "Add to Itinerary" button click
    const handleAddToItinerary = (place) => {
        setSelectedPlace(place); // Store the selected place
        setShowModal(true); // Open the modal
        console.log('Selected place name:', place.name); // CHECK IF NAMES ARE BEING PROPERLY STORED

        // Store the name of the selected place and its photo
        localStorage.setItem('selectedPlaceName', place.name);
        localStorage.setItem('selectedPlacePhoto', place.photo_url);
    };


    return (
        <div>
            <ItineraryHeader /> {/* Render the itinerary header */}
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
                    {/* Render various filter dropdowns */}
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
                            {/* // STORING THE NAME WHEN ONCLICK */}
                            <button className="add-button" onClick={() => handleAddToItinerary(place)}>Add to Itinerary</button> {/* Pass the place object */}
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
                show={showModal} // Show the modal only if showModal is true
                onClose={() => setShowModal(false)}
                place={selectedPlace} // Pass the selected place to the modal
            />
            <Footer /> {/* Render the footer */}
        </div>
    );
};

export default ItineraryPage;