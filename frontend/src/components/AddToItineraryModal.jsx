import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddToItineraryModal.css'; // Ensure the path is correct

// Create an Axios instance with the required configuration
const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://colab-app.onrender.com' : 'http://localhost:5000',
    withCredentials: true,
});

// Component for adding a place to an itinerary
const AddToItineraryModal = ({ show, onClose, place }) => {
    // State variables
    const [itineraries, setItineraries] = useState([]); // State to store fetched itineraries
    const [selectedItinerary, setSelectedItinerary] = useState(null); // State to store the selected itinerary
    const [newItineraryName, setNewItineraryName] = useState(''); // State to store the name of a new itinerary
    const [message, setMessage] = useState(''); // State to display messages to the user
    const [showModal, setShowModal] = useState(false); // State to control the modal visibility

    // Function to fetch the list of itineraries from the backend
    const fetchItineraries = async () => {
        try {
            const response = await axiosInstance.get('/itineraries');
            setItineraries(response.data.itineraries);
        } catch (error) {
            console.error('Error fetching itineraries:', error);
        }
    };

    // Fetch itineraries when the modal is shown
    useEffect(() => {
        if (showModal) {
            fetchItineraries();
        }
    }, [showModal]);

    // Show modal when place is selected
    useEffect(() => {
        if (place) {
            setShowModal(true);
        }
    }, [place]);

    // Function to handle adding the selected place to the selected itinerary
    const handleAddToItinerary = async () => {
        if (!selectedItinerary) {
            setMessage('Please select an itinerary.');
            return;
        }

        try {
            const response = await axiosInstance.post(`/itineraries/${selectedItinerary.id}/items`, {
                name: place.name,
                photo_url: place.photo_url,
            });
            setMessage('Place added to itinerary successfully.');
            setShowModal(false); // Close the modal after successfully adding a place
        } catch (error) {
            console.error('Error adding place to itinerary:', error);
            setMessage('Error adding place to itinerary.');
        }
    };

    // Function to handle creating a new itinerary
    const handleCreateItinerary = async () => {
        try {
            const response = await axiosInstance.post('/itineraries', { name: newItineraryName });
            const newItinerary = response.data.itinerary;
            setItineraries([...itineraries, newItinerary]);
            setSelectedItinerary(newItinerary);
            setMessage('New itinerary created and place added.');
            setShowModal(false); // Close the modal after successfully adding a place
        } catch (error) {
            console.error('Error creating itinerary:', error);
            setMessage('Error creating itinerary.');
        }
    };

    // Function to handle selecting an existing itinerary
    const handleSelectItinerary = (itinerary) => {
        setSelectedItinerary(itinerary);
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setShowModal(false);
        onClose();
        setMessage('');
    };

    // JSX to render the modal content
    return (
        <>
            {showModal && (
                <div className="add-to-itinerary-modal">
                    <div className="add-to-itinerary-modal-content">
                        <span className="add-to-itinerary-modal-close" onClick={handleCloseModal}>&times;</span>
                        <h2>Add to Itinerary</h2>
                        <div>
                            <h3>Choose an existing itinerary:</h3>
                            {itineraries && itineraries.length > 0 ? (
                                <ul>
                                    {itineraries.map((itinerary) => (
                                        <li
                                            key={itinerary.id}
                                            className={selectedItinerary && selectedItinerary.id === itinerary.id ? 'add-to-itinerary-modal-selected' : ''}
                                            onClick={() => handleSelectItinerary(itinerary)}
                                        >
                                            {itinerary.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No existing itineraries found.</p>
                            )}
                        </div>
                        <div>
                            <h3>Create a new itinerary:</h3>
                            <input
                                type="text"
                                value={newItineraryName}
                                onChange={(e) => setNewItineraryName(e.target.value)}
                                placeholder="New itinerary name"
                            />
                            <button onClick={handleCreateItinerary}>Create</button>
                        </div>
                        <button onClick={handleAddToItinerary}>Add to Itinerary</button>
                        {message && <p className="add-to-itinerary-modal-message">{message}</p>}
                    </div>
                </div>
            )}
        </>
    );
};

export default AddToItineraryModal;
