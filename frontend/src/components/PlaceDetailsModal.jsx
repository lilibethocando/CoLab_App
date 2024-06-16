import React from 'react';
import "../styles/PlaceDetailsModal.css";

const PlaceDetailsModal = ({ show, onClose, placeDetails }) => {
    if (!show) return null;

    const { name, photo_url, address, phone_number, opening_hours, price_level, website } = placeDetails;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="close-button">&times;</button>
                <div className="place-title">
                    <h4>{name}</h4>
                </div>
                <hr className="yellow-divider" />

                <div className="place-details">
                    <div className="address">
                        <h5>Address</h5>
                        <p>{address || 'Information not available'}</p>
                    </div>
                    <div className="detail">
                        <h5>Contact</h5>
                        <p>{phone_number || 'Information not available'}</p>
                    </div>
                    <div className="detail">
                        <h5>Hours</h5>
                        {opening_hours.length > 0 ? (
                            <ul>
                                {opening_hours.map((hours, index) => (
                                    <li key={index}>{hours}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Information not available at this time</p>
                        )}
                    </div>
                    <div className="detail">
                        <h5>Price</h5>
                        <p>{price_level !== 'Price level not available' ? price_level : 'Information not available at this time'}</p>
                    </div>
                    <div className="detail">
                        <h5>Website</h5>
                        <p>{website !== 'Website not available' ? <a href={website} target="_blank" rel="noopener noreferrer">{website}</a> : 'Information not available'}</p>
                    </div>
                </div>
                <div className="place-image-container">
                    <img src={photo_url} alt={name} className="place-image" />
                </div>
            </div>
        </div>
    );
};

export default PlaceDetailsModal;
