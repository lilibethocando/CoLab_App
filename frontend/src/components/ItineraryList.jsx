import React from 'react';

const ItineraryList = ({ itineraries }) => {
    return (
        <ul>
            {itineraries.map((itinerary, index) => (
                <li key={index}>{itinerary.name}</li>
            ))}
        </ul>
    );
};

export default ItineraryList;
