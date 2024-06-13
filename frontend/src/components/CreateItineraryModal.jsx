import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddToItineraryModal.css'; // Ensure the path is correct

const CreateItineraryModal = ({ show, onClose, onCreate }) => {
    const [newItineraryName, setNewItineraryName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const axiosInstance = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? 'https://colab-app.onrender.com' : 'http://localhost:5000',
        withCredentials: true,
    });

    const handleCreateItinerary = async () => {
        if (newItineraryName) {
            try {
                // Create new itinerary
                const response = await axiosInstance.post('/itineraries', { name: newItineraryName });
                const newItinerary = response.data.itinerary;

                // Add selected place to the newly created itinerary
                const selectedPlaceName = localStorage.getItem('selectedPlaceName');
                const selectedPlacePhoto = localStorage.getItem('selectedPlacePhoto');
                const userId = localStorage.getItem('userId');

                await axiosInstance.post(`/itineraries/${newItinerary.id}/items`, {
                    name: selectedPlaceName,
                    photo_url: selectedPlacePhoto,
                    user_id: userId,
                });

                // Call the onCreate callback to update parent component
                onCreate(newItinerary);

                // Reset state and close modal
                setNewItineraryName('');
                onClose();
            } catch (error) {
                console.error('Error creating itinerary:', error);
                setErrorMessage('Failed to create itinerary. Please try again.');
            }
        } else {
            setErrorMessage('Please enter a name for the itinerary.');
        }
    };

    return (
        <>
            {show && (
                <div className="create-itinerary-modal">
                    <div className="create-itinerary-modal-content">
                        <span className="create-itinerary-modal-close" onClick={onClose}>&times;</span>
                        <h2>Create New Itinerary</h2>
                        <div className="divider"></div>
                        <input
                            type="text"
                            value={newItineraryName}
                            onChange={(e) => setNewItineraryName(e.target.value)}
                            placeholder="Name / Title"
                            className="input-field"
                        />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button
                            onClick={handleCreateItinerary}
                            className="create-button"
                        >
                            Create
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateItineraryModal;
