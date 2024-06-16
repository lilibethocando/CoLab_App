import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddToItineraryModal.css';
import CreateItineraryModal from './CreateItineraryModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://colab-app.onrender.com' : 'http://localhost:5000',
    withCredentials: true,
});

const AddToItineraryModal = ({ show, onClose, place }) => {
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(false); // State for loading indicator

    useEffect(() => {
        if (showModal) {
            fetchItineraries();
        }
    }, [showModal]);

    useEffect(() => {
        if (place) {
            setShowModal(true);
        }
    }, [place]);

    const fetchItineraries = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const response = await axiosInstance.get('/itineraries');
            setItineraries(response.data.itineraries);
        } catch (error) {
            console.error('Error fetching itineraries:', error);
        }
        setLoading(false); // Set loading to false after fetching
    };

    const handleSelectItinerary = async (itinerary) => {
        setLoading(true); // Set loading to true before API call
        setSelectedItinerary(itinerary);
        localStorage.setItem('selectedItineraryName', itinerary.name);
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
            setShowModal(false);
            setTimeout(() => {
                // Add any post-action logic here
                setLoading(false); // Set loading to false after API call
            }, 3000); // Example: Hide modal after 3 seconds
        } catch (error) {
            console.error('Error adding place to itinerary:', error);
            setLoading(false); // Set loading to false if there's an error
        }
    };

    const handleOpenCreateModal = () => {
        setShowModal(false);
        setShowCreateModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        onClose();
    };

    const handleCreateItinerary = (newItinerary) => {
        setItineraries([...itineraries, newItinerary]);
        setSelectedItinerary(newItinerary);
        setShowCreateModal(false);
    };

    const getRandomPhoto = (itinerary) => {
        if (itinerary.items && itinerary.items.length > 0) {
            const randomPlace = itinerary.items[Math.floor(Math.random() * itinerary.items.length)];
            return randomPlace.photo_url;
        } else {
            return null;
        }
    };

    return (
        <>
            {showModal && (
                <div className="add-to-itinerary-modal">
                    <div className="add-to-itinerary-modal-content">
                        <span className="add-to-itinerary-modal-close" onClick={handleCloseModal}>&times;</span>
                        <h2>Add to Itinerary</h2>
                        <div className="divider"></div>
                        <div>
                            {loading ? (
                                <div className="loading-container">
                                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                                </div>
                            ) : (
                                itineraries && itineraries.length > 0 ? (
                                    <div className="itinerary-list">
                                        {itineraries.map((itinerary) => (
                                            <div
                                                key={itinerary.id}
                                                className={`itinerary-item ${selectedItinerary && selectedItinerary.id === itinerary.id ? 'add-to-itinerary-modal-selected' : ''}`}
                                                onClick={() => handleSelectItinerary(itinerary)}
                                            >
                                                <img src={getRandomPhoto(itinerary)} alt={itinerary.name} />
                                                <span>{itinerary.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No existing itineraries found.</p>
                                )
                            )}
                        </div>
                        <button onClick={handleOpenCreateModal}>Create New Itinerary</button>
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

