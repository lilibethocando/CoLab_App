import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddToItineraryModal.css'; // Ensure the path is correct

const CreateItineraryModal = ({ show, onClose, onCreate }) => {
    const [newItineraryName, setNewItineraryName] = useState('');

    const axiosInstance = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? 'https://colab-app.onrender.com' : 'http://localhost:5000',
        withCredentials: true,
    });

    const handleCreateItinerary = async () => {
        if (newItineraryName) {
            try {
                const response = await axiosInstance.post('/itineraries', { name: newItineraryName });
                const newItinerary = response.data.itinerary;

                const selectedPlaceName = localStorage.getItem('selectedPlaceName');
                const selectedPlacePhoto = localStorage.getItem('selectedPlacePhoto');
                const userId = localStorage.getItem('userId');

                await axiosInstance.post(`/itineraries/${newItinerary.id}/items`, {
                    name: selectedPlaceName,
                    photo_url: selectedPlacePhoto,
                    user_id: userId,
                });

                onCreate(newItinerary);
                setNewItineraryName('');
                onClose();
            } catch (error) {
                console.error('Error creating itinerary:', error);
            }
        }
    };

    return (
        <>
            {show && (
                <div className="create-itinerary-modal">
                    <div className="create-itinerary-modal-content">
                        <span className="create-itinerary-modal-close" onClick={onClose}>&times;</span>
                        <h2>Create New Itinerary</h2>
                        <div className="yellow-divider"></div> {/* Add yellow divider here */}
                        <div>
                            <input
                                type="text"
                                value={newItineraryName}
                                onChange={(e) => setNewItineraryName(e.target.value)}
                                placeholder="New itinerary name"
                                className="full-width-input"
                            />
                            <button onClick={handleCreateItinerary}>Create</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateItineraryModal;
