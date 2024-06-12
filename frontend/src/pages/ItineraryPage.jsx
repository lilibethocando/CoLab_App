import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import ItineraryHeader from "../components/ItineraryHeader";
import AddToItineraryModal from '../components/AddToItineraryModal';
import "../styles/ItineraryPage.css";


// Create an axios instance for API calls
const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://colab-app.onrender.com' : 'http://localhost:5000',
    withCredentials: true,
});

const ItineraryPage = () => {
    const [searchTerm, setSearchTerm] = useState('');  // State to hold the search term
    const [selectedPlace, setSelectedPlace] = useState(null);  // State to hold the selected place
    const [places, setPlaces] = useState([]);  // State to hold the list of places
    const [loading, setLoading] = useState(false);  // State to handle loading status
    const [showModal, setShowModal] = useState(false);  // State to handle modal visibility
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to handle login status
    const [selectedFilters, setSelectedFilters] = useState([]);  // State to handle selected filters
    const [checkboxState, setCheckboxState] = useState({}); // State to track checkbox state
    const [visiblePlacesCount, setVisiblePlacesCount] = useState(6);  // State to track number of visible places
    const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null);
    const navigate = useNavigate();

    // Check if the user is logged in when the component mounts
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

    // Fetch places based on the search term and selected filters
    useEffect(() => {
        const fetchPlaces = async () => {
            setLoading(true);  // Set loading to true while fetching data
            try {
                const response = await axiosInstance.post('/itinerary_search', {
                    city: searchTerm,
                    categories: selectedFilters,
                });
                console.log('Filtered Response:', response.data);
                if (response.data && response.data.places) {
                    setPlaces(response.data.places);
                } else {
                    console.error('Invalid response data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching filtered places:', error);
            }
            setLoading(false);  // Set loading to false after fetching data
        };

        if (searchTerm && searchTerm.trim() !== '') {
            fetchPlaces();
        }
    }, [searchTerm, selectedFilters]);  // Effect depends on searchTerm and selectedFilters

    // Handle changes in the search input
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle changes in the filter checkboxes
    const handleCheckboxChange = (filter) => {
        setSelectedFilters((prevFilters) => 
            prevFilters.includes(filter) ? prevFilters.filter(item => item !== filter) : [...prevFilters, filter]
        );

        // Update checkbox state
        setCheckboxState((prevState) => ({
            ...prevState,
            [filter]: !prevState[filter], // Toggle the checkbox state
        }));
    };

    const handleRemoveFilter = (filter) => {
        setSelectedFilters((prevFilters) => prevFilters.filter(item => item !== filter));

        // Update checkbox state
        setCheckboxState((prevState) => ({
            ...prevState,
            [filter]: false, // Uncheck the checkbox
        }));
    };

    const handleAddToItinerary = (place) => {
        setSelectedPlace(place);
        setShowModal(true);
        console.log('Selected place name:', place.name);

        localStorage.setItem('selectedPlaceName', place.name);
        localStorage.setItem('selectedPlacePhoto', place.photo_url);
    };

    const handleLoadMore = () => {
        setVisiblePlacesCount((prevCount) => prevCount + 3);
    };

   

    return (
        <div>
            <SecondNavbar />
            <ItineraryHeader />
            <div className="content-container">
                <div className="search-container">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search city"
                            className="search-input"
                        />
                    </form>
                </div>
                <div className="filter-container">
                    <div className="dropdown">
                        <button className="dropbtn">Arts & Culture <span className="arrow-down">&#9660;</span></button>
                        <div className="dropdown-content">
                            <input
                                type="checkbox"
                                id="museums"
                                name="museums"
                                value="museums"
                                checked={checkboxState['museums'] || false}
                                onChange={() => handleCheckboxChange('museums')}
                            />
                            <label htmlFor="museums">Museums</label><br />
                            <input
                                type="checkbox"
                                id="artGalleries"
                                name="artGalleries"
                                value="artGalleries"
                                checked={checkboxState['artGalleries'] || false}
                                onChange={() => handleCheckboxChange('artGalleries')}
                            />
                            <label htmlFor="artGalleries">Art Galleries</label><br />
                            <input
                                type="checkbox"
                                id="theatre"
                                name="theatre"
                                value="theatre"
                                checked={checkboxState['theatre'] || false}
                                onChange={() => handleCheckboxChange('theatre')}
                            />
                            <label htmlFor="theatre">Theatre</label><br />
                            <input
                                type="checkbox"
                                id="historicalMonuments"
                                name="historicalMonuments"
                                value="historicalMonuments"
                                checked={checkboxState['historicalMonuments'] || false}
                                onChange={() => handleCheckboxChange('historicalMonuments')}
                            />
                            <label htmlFor="historicalMonuments">Monuments</label><br />
                            <input
                                type="checkbox"
                                id="tours"
                                name="tours"
                                value="tours"
                                checked={checkboxState['tours'] || false}
                                onChange={() => handleCheckboxChange('tours')}
                            />
                            <label htmlFor="tours">Tours</label>
                        </div>
                    </div>
                </div>
                <div className="filter-container">
                    <div className="dropdown">
                        <button className="dropbtn">Outdoors <span className="arrow-down">&#9660;</span></button>
                        <div className="dropdown-content">
                            <input
                                type="checkbox"
                                id="camping"
                                name="camping"
                                value="camping"
                                checked={checkboxState['camping'] || false}
                                onChange={() => handleCheckboxChange('camping')}
                            />
                            <label htmlFor="camping">Camping</label><br />
                            <input
                                type="checkbox"
                                id="park"
                                name="park"
                                value="park"
                                checked={checkboxState['park'] || false}
                                onChange={() => handleCheckboxChange('park')}
                            />
                            <label htmlFor="park">Park</label><br />
                            <input
                                type="checkbox"
                                id="trail"
                                name="trail"
                                value="trail"
                                checked={checkboxState['trail'] || false}
                                onChange={() => handleCheckboxChange('trail')}
                            />
                            <label htmlFor="trail">Trail</label>
                        </div>
                    </div>
                </div>
                <div className="filter-container">
                    <div className="dropdown">
                        <button className="dropbtn">Food & Drink <span className="arrow-down">&#9660;</span></button>
                        <div className="dropdown-content">
                            <input
                                type="checkbox"
                                id="breweries"
                                name="breweries"
                                value="breweries"
                                checked={checkboxState['breweries'] || false}
                                onChange={() => handleCheckboxChange('breweries')}
                            />
                            <label htmlFor="breweries">Breweries</label><br />
                            <input
                                type="checkbox"
                                id="wineries"
                                name="wineries"
                                value="wineries"
                                checked={checkboxState['wineries'] || false}
                                onChange={() => handleCheckboxChange('wineries')}
                            />
                            <label htmlFor="wineries">Wineries</label><br />
                            <input
                                type="checkbox"
                                id="restaurants"
                                name="restaurants"
                                value="restaurants"
                                checked={checkboxState['restaurants'] || false}
                                onChange={() => handleCheckboxChange('restaurants')}
                            />
                            <label htmlFor="restaurants">Restaurants</label><br />
                            <input
                                type="checkbox"
                                id="coffee-shops"
                                name="coffee-shops"
                                value="coffee-shops"
                                checked={checkboxState['coffee-shops'] || false}
                                onChange={() => handleCheckboxChange('coffee-shops')}
                            />
                            <label htmlFor="coffee-shops">Coffee Shops</label>
                        </div>
                    </div>
                </div>
                <div className="filter-container">
                    <div className="dropdown">
                        <button className="dropbtn">Time Filter <span className="arrow-down">&#9660;</span></button>
                        <div className="dropdown-content">
                            <input
                                type="checkbox"
                                id="morning"
                                name="timeFilter"
                                value="morning"
                                checked={checkboxState['morning'] || false}
                                onChange={() => handleCheckboxChange('morning')}
                            />
                            <label htmlFor="morning">Morning</label><br />
                            <input
                                type="checkbox"
                                id="afternoon"
                                name="timeFilter"
                                value="afternoon"
                                checked={checkboxState['afternoon'] || false}
                                onChange={() => handleCheckboxChange('afternoon')}
                            />
                            <label htmlFor="afternoon">Afternoon</label><br />
                            <input
                                type="checkbox"
                                id="night"
                                name="timeFilter"
                                value="night"
                                checked={checkboxState['night'] || false}
                                onChange={() => handleCheckboxChange('night')}
                            />
                            <label htmlFor="night">Night</label><br />
                        </div>
                    </div>
                </div>
            </div>
            {/* Render selected filter chips */}
            <div className="selected-filters">
                {selectedFilters.map((filter, index) => (
                    <div key={index} className="filter-chip">
                        {filter}
                        <button onClick={() => handleRemoveFilter(filter)}>&times;</button>
                    </div>
                ))}
            </div>
            {/* Loading message and itinerary grid */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="content-container">
                        <div className="itinerary-grid">
                            {places.slice(0, visiblePlacesCount).map((place, index) => (
                                <div key={index} className="itinerary-grid-item">
                                    <div className="place-item">
                                        <button className="add-button" onClick={() => handleAddToItinerary(place)}>Add to Itinerary</button>
                                        {place.photo_url ? (
                                            <img src={place.photo_url} alt={place.name} onClick={() => handlePlaceImageClick(place.id)} />
                                        ) : (
                                            <div onClick={() => handlePlaceImageClick(place.id)}>No Image Available</div>
                                        )}
                                    </div>
                                    <h3 className="place-name">{place.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    {visiblePlacesCount < places.length ? (
                        <div className="load-more-container">
                            <button onClick={handleLoadMore} className="load-more-button">Load More</button>
                        </div>
                    ) : (
                        <div className="no-more-places">No more places to load</div>
                    )}
                </>
            )}
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



