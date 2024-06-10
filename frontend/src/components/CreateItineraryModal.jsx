import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddToItineraryModal.css'; // Ensure the path is correct

const CreateItineraryModal = ({ show, onClose, onCreate }) => {
    // State variable to store the new itinerary name
    const [newItineraryName, setNewItineraryName] = useState('');

    // Create an Axios instance with the required configuration
    const axiosInstance = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? 'https://colab-app.onrender.com' : 'http://localhost:5000',
        withCredentials: true,
    });

    // Function to handle creating a new itinerary
    // Function to handle creating a new itinerary and adding the selected place to it
    const handleCreateItinerary = async () => {
        if (newItineraryName) {
            try {
                // Create the new itinerary
                const response = await axiosInstance.post('/itineraries', { name: newItineraryName });
                const newItinerary = response.data.itinerary;

                // Retrieve the selected place name and photo
                const selectedPlaceName = localStorage.getItem('selectedPlaceName');
                const selectedPlacePhoto = localStorage.getItem('selectedPlacePhoto');
                const userId = localStorage.getItem('userId');

                // Add the selected place to the newly created itinerary
                await axiosInstance.post(`/itineraries/${newItinerary.id}/items`, {
                    name: selectedPlaceName,
                    photo_url: selectedPlacePhoto,
                    user_id: userId,
                });

                onCreate(newItinerary); // Pass the new itinerary back to the parent component
                setNewItineraryName(''); // Reset the input field
                onClose(); // Close the modal
            } catch (error) {
                console.error('Error creating itinerary:', error);
            }
        }
    };


    // JSX to render the modal content
    return (
        <>
            {show && (
                <div className="create-itinerary-modal">
                    <div className="create-itinerary-modal-content">
                        <span className="create-itinerary-modal-close" onClick={onClose}>&times;</span>
                        <h2>Create New Itinerary</h2>
                        <div>
                            <input
                                type="text"
                                value={newItineraryName}
                                onChange={(e) => setNewItineraryName(e.target.value)}
                                placeholder="New itinerary name"
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
