import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddToItineraryModal.css'; // Ensure the path is correct
import CreateItineraryModal from './CreateItineraryModal'; // Import the CreateItineraryModal component

const AddToItineraryModal = ({ show, onClose, place }) => {
    const [selectedItinerary, setSelectedItinerary] = useState(null); // State to store the selected itinerary
    const [message, setMessage] = useState(''); // State to display messages to the user
    const [showModal, setShowModal] = useState(false); // State to control the main modal visibility
    const [showCreateModal, setShowCreateModal] = useState(false); // State to control the create modal visibility
    const [itineraries, setItineraries] = useState([]); // State to store fetched itineraries

    // Create an Axios instance with the required configuration
    const axiosInstance = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? 'https://colab-app.onrender.com' : 'http://localhost:5000',
        withCredentials: true,
    });

    // Function to handle adding the selected place to the selected itinerary
    const handleAddToItinerary = async () => {
        if (!selectedItinerary) {
            setMessage('Please select an itinerary.');
            return;
        }

        const selectedPlaceName = localStorage.getItem('selectedPlaceName');
        const selectedPlacePhoto = localStorage.getItem('selectedPlacePhoto');
        const userId = localStorage.getItem('userId');
        const itineraryId = selectedItinerary.id;

        try {
            await axiosInstance.post(`/itineraries/${itineraryId}/items`, {
                name: selectedPlaceName,
                photo_url: selectedPlacePhoto,
                user_id: userId,
            });
            setShowModal(false);
        } catch (error) {
            console.error('Error adding place to itinerary:', error);
            setMessage('Error adding place to itinerary.');
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

    // Function to fetch the list of itineraries from the backend
    const fetchItineraries = async () => {
        try {
            const response = await axiosInstance.get('/itineraries');
            setItineraries(response.data.itineraries);
        } catch (error) {
            console.error('Error fetching itineraries:', error);
        }
    };

    // Function to handle selecting an itinerary
    const handleSelectItinerary = async (itinerary) => {
        setSelectedItinerary(itinerary);
        localStorage.setItem('selectedItineraryName', itinerary.name);

        // Retrieve the previously selected place name and photo
        const selectedPlaceName = localStorage.getItem('selectedPlaceName');
        const selectedPlacePhoto = localStorage.getItem('selectedPlacePhoto');
        const userId = localStorage.getItem('userId');
        const itineraryId = itinerary.id;

        try {
            await axiosInstance.post(`/itineraries/${itineraryId}/items`, {
                name: selectedPlaceName,
                photo_url: selectedPlacePhoto,
                user_id: userId,
            });
            setShowModal(false); // Close the main modal after successfully adding a place
        } catch (error) {
            console.error('Error adding place to itinerary:', error);
            setMessage('Error adding place to itinerary.');
        }
    };


    // Function to handle opening the CreateItineraryModal
    const handleOpenCreateModal = () => {
        setShowModal(false);
        setShowCreateModal(true);
    };

    // Function to handle closing the main modal
    const handleCloseModal = () => {
        setShowModal(false);
        onClose();
        setMessage('');
    };

    // Function to handle creating a new itinerary
    const handleCreateItinerary = (newItinerary) => {
        setItineraries([...itineraries, newItinerary]);
        setSelectedItinerary(newItinerary);
        setShowCreateModal(false);
    };

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
                                            onClick={() => {
                                                handleSelectItinerary(itinerary);
                                                handleAddToItinerary();
                                            }}
                                        >
                                            {itinerary.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No existing itineraries found.</p>
                            )}
                        </div>
                        <button onClick={handleOpenCreateModal}>Create New Itinerary</button>
                        <button onClick={handleAddToItinerary}>Add to Itinerary</button>
                        {message && <p className="add-to-itinerary-modal-message">{message}</p>}
                    </div>
                </div>
            )}

            {/* Create New Itinerary Modal */}
            {showCreateModal && (
                <CreateItineraryModal
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onCreate={handleCreateItinerary}
                />
            )}
        </>
    );
};

export default AddToItineraryModal;

