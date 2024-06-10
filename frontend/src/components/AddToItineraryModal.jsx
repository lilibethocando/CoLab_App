import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddToItineraryModal.css'; // Ensure the path is correct

// Component for adding a place to an itinerary
const AddToItineraryModal = ({ show, onClose, place }) => {
    // State variables
    const [itineraries, setItineraries] = useState([]); // State to store fetched itineraries
    const [selectedItinerary, setSelectedItinerary] = useState(null); // State to store the selected itinerary
    const [newItineraryName, setNewItineraryName] = useState(''); // State to store the name of a new itinerary
    const [message, setMessage] = useState(''); // State to display messages to the user

    // Function to fetch the list of itineraries from the backend
    const fetchItineraries = async () => {
        try {
            const response = await axios.get('/itineraries'); // GET request to '/itineraries'
            setItineraries(response.data.itineraries);
        } catch (error) {
            console.error('Error fetching itineraries:', error);
        }
    };
    // the itineraries will be fetched and logged to the console every time the modal is shown. This will 
    //help us verify if the itineraries are being retrieved successfully before reaching the part where we try to access the user ID.
    // Fetch itineraries when the modal is shown
    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const response = await axios.get('/itineraries');
                console.log('Fetched itineraries:', response.data.itineraries);
            } catch (error) {
                console.error('Error fetching itineraries:', error);
            }
        };
    
        if (show) {
            console.log('Fetching itineraries...');
            fetchItineraries();
        }
    }, [show]);
    

    // Function to handle adding the selected place to the selected itinerary
    const handleAddToItinerary = async () => {
        const user_id = localStorage.getItem('user_id');
        if (!user_id) {
            console.log('User not logged in');
            return;
        }

        if (!selectedItinerary) {
            setMessage('Please select an itinerary.');
            return;
        }

        try {
            const response = await axios.post(`/itineraries/${selectedItinerary.id}/items`, {
                name: place.name,
                photo_url: place.photo_url,
            });
            setMessage('Place added to itinerary successfully.');
        } catch (error) {
            console.error('Error adding place to itinerary:', error);
            setMessage('Error adding place to itinerary.');
        }
    };

    // Function to handle creating a new itinerary
    const handleCreateItinerary = async () => {
        const user_id = localStorage.getItem('user_id');
        if (!user_id) {
            console.log('User not logged in');
            return;
        }

        try {
            const response = await axios.post('/itineraries', { name: newItineraryName });
            const newItinerary = response.data.itinerary;
            setItineraries([...itineraries, newItinerary]);
            setSelectedItinerary(newItinerary);
            setMessage('New itinerary created and place added.');
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
        onClose();
        setMessage('');
    };

    // If show is false or no place is selected, return null
    if (!show || !place) {
        return null;
    }

    // JSX to render the modal content
    return (
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
    );
};

export default AddToItineraryModal;
