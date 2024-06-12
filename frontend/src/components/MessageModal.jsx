import React, { useState, useEffect } from 'react';
import '../styles/MessageModal.css'; // Import CSS for styling

const MessageModal = ({ show, onClose, message, title = 'Message', duration = 2000 }) => {
    const [display, setDisplay] = useState(true);

    useEffect(() => {
        let timeout;
        if (show) {
            console.log('Message set:', message);
            // Display message for specified duration
            timeout = setTimeout(() => {
                setDisplay(false);
                console.log('Message reset');
                onClose();
            }, duration);
        }
        return () => {
            clearTimeout(timeout);
            console.log('Message reset due to component unmount');
        };
    }, [show, onClose, duration, message]);

    const handleClose = () => {
        setDisplay(false);
        onClose();
    };

    return (
        <div className={show && display ? "modal-container" : "hidden"}>
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{message}</p>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

// Define the messages
export const Messages = {
    ITINERARY_ALREADY_SELECTED: 'Itinerary already selected.',
    ITINERARY_CREATED_SUCCESSFULLY: 'Itinerary created successfully.',
    PLACE_ADDED_SUCCESSFULLY: 'Place added successfully.'
};

export default MessageModal;
