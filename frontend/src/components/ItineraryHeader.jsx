import React from 'react';
import header1 from '../images/header1.jpg';
import header2 from '../images/header2.jpg';
import header3 from '../images/header3.jpg';
import header4 from '../images/header4.jpg';

const ItineraryHeader = () => {
  const images = [
    { src: header1, alt: 'header1' },
    { src: header2, alt: 'header2' },
    { src: header3, alt: 'header3' },
    { src: header4, alt: 'header4' },
  ];

  return (
    <div className="itinerary-header">
      <div className="header-text-container">
        <p className="header-text">Explore our destinations and start planning your trip!</p>
      </div>
      <div className="image-grid-container">
        {images.map((image, index) => (
          <img
            src={image.src}
            alt={image.alt}
            key={index} // Use index as key since src might not be unique
            className="header-image" // Apply a class for consistent styling
          />
        ))}
      </div>
    </div>
  );
};

export default ItineraryHeader;
