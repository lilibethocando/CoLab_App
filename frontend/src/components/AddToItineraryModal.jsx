import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddToItineraryModal = ({ show, onClose }) => {
    const [itineraries, setItineraries] = useState([]); // State to store the list of itineraries
    const [newItineraryName, setNewItineraryName] = useState(''); // State to store the name of a new itinerary
    const [creatingNewItinerary, setCreatingNewItinerary] = useState(false); // State to toggle the creation of a new itinerary
    const [selectedItinerary, setSelectedItinerary] = useState(null); // State to store the selected itinerary

    // Fetch itineraries when the modal is shown
    useEffect(() => {
        if (show) {
            fetchItineraries();
        }
    }, [show]);

    // Fetch the list of itineraries from the backend
    const fetchItineraries = async () => {
        try {
            const response = await axios.get('/itineraries');
            setItineraries(response.data.itineraries); // Update the state with fetched itineraries
        } catch (error) {
            console.error('Error fetching itineraries:', error);
        }
    };

    // Handle the creation of a new itinerary
    const handleCreateItinerary = async () => {
        try {
            const response = await axios.post('/itineraries', { name: newItineraryName });
            const newItinerary = response.data.itinerary;
            setItineraries([...itineraries, newItinerary]); // Add the new itinerary to the state
            setCreatingNewItinerary(false); // Reset the creation state
            setSelectedItinerary(newItinerary); // Select the newly created itinerary
        } catch (error) {
            console.error('Error creating itinerary:', error);
        }
    };

    // Handle adding an item to the selected itinerary
    const handleAddToExistingItinerary = async () => {
        if (!selectedItinerary) {
            console.error("No itinerary selected.");
            return;
        }
        try {
            const itemData = {
                name: "Item Name",
                // Add additional item details here if necessary
            };
    
            // Make a POST request to the backend to add the item to the selected itinerary
            const response = await axios.post(`/itineraries/${selectedItinerary.id}/items`, itemData);
            console.log("Item added to existing itinerary:", response.data);
    
            // Display a success message or handle the response as needed
        } catch (error) {
            console.error("Error adding item to existing itinerary:", error);
            // Handle errors appropriately
        }
    };

    // Wrapper function to handle the addition process
    const handleAddToSelectedItinerary = async () => {
        await handleAddToExistingItinerary();
    };
        
    // Handle selecting an itinerary
    const handleSelectItinerary = (itinerary) => {
        setSelectedItinerary(itinerary); // Set the selected itinerary
    };

    // Handle closing the modal
    const handleCloseModal = () => {
        onClose(); // Call the onClose function passed as a prop to close the modal
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}> {/* Conditional class to show/hide the modal */}
            <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>&times;</span> {/* Close button */}
                <h2>Add to Itinerary</h2>
                <div>
                    <h3>Choose an existing itinerary:</h3>
                    <ul>
                        {itineraries.map((itinerary) => ( // Map through itineraries to display them
                            <li key={itinerary.id} onClick={() => handleSelectItinerary(itinerary)}>
                                {itinerary.name}
                            </li>
                        ))}
                    </ul>
                </div>
                {creatingNewItinerary ? (
                    <div>
                        <h3>Create a new itinerary:</h3>
                        <input type="text" value={newItineraryName} onChange={(e) => setNewItineraryName(e.target.value)} />
                        <button onClick={handleCreateItinerary}>Create</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => setCreatingNewItinerary(true)}>Create New Itinerary</button>
                    </div>
                )}
                {selectedItinerary && (
                    <div>
                        <button onClick={handleAddToSelectedItinerary}>Add to Selected Itinerary</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddToItineraryModal;
