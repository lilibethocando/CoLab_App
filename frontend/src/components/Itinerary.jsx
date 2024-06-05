import React from 'react';

const Itinerary = ({ places }) => {
  return (
    <div>
      <h2>Places</h2>
      <div className="grid-container">
        {places.map((place) => (
          <div className="place-card" key={place.place_id}>
            <h3>{place.name}</h3>
            <p>{place.address}</p>
            {place.photo_url && <img src={place.photo_url} alt={place.name} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
