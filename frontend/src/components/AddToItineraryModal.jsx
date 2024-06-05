import React from 'react';

const AddToItineraryModal = ({ showModal, onClose }) => {
    return (
        showModal && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>Add to Itinerary</h2>
                    <p>Select an itinerary to add this place:</p>
                    {/* Display the list of itineraries here */}
                    <button>Create New Itinerary</button>
                </div>
            </div>
        )
    );
};

export default AddToItineraryModal;
