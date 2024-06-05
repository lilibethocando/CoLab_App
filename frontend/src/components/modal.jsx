import React, { useState } from 'react';

const Modal = ({ show, onClose }) => {
    const [itineraryName, setItineraryName] = useState('');

    const handleNameChange = (e) => {
        setItineraryName(e.target.value);
    };

    const handleCreateItinerary = () => {
        // Logic to handle creating the itinerary
        // You can make an API call here to save the itinerary to the database
        console.log("Creating itinerary with name:", itineraryName);
        // After creating the itinerary, you may want to close the modal
        onClose();
    };

    return (
        <div className={show ? "modal display-block" : "modal display-none"}>
            <section className="modal-main">
                <h2>Create Itinerary</h2>
                <label htmlFor="itineraryName">Itinerary Name:</label>
                <input
                    type="text"
                    id="itineraryName"
                    value={itineraryName}
                    onChange={handleNameChange}
                />
                <button onClick={handleCreateItinerary}>Create Itinerary</button>
                <button onClick={onClose}>Close</button>
            </section>
        </div>
    );
};

export default Modal;
