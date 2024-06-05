import React from 'react';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import image6 from '../images/image6.jpg';

const ItineraryHeader = () => {
  const images = [
    
    { src: image2, alt: 'Image 2' },
    { src: image3, alt: 'Image 3' },
    { src: image4, alt: 'Image 4' },
    { src: image6, alt: 'Image 6' },
  ];

  return (
    <div className="itinerary-header">
      <div className="header-text-container">
        <p className="header-text">Explore our destinations and start planning your trip!</p>
      </div>
      <div className="image-grid-container">
        {images.map((image) => (
          <img src={image.src} alt={image.alt} key={image.src} style={{ padding: '20px' }} />
        ))}
      </div>
    </div>
  );
};

export default ItineraryHeader;
