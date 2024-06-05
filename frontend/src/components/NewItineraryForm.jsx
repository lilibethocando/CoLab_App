import React, { useState } from 'react';
import axios from 'axios';

const NewItineraryForm = ({ onClose, onAddItinerary }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/itineraries', { name });
            onAddItinerary();
            onClose();
        } catch (error) {
            console.error('Error creating itinerary:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Itinerary Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">Create</button>
        </form>
    );
};

export default NewItineraryForm;
