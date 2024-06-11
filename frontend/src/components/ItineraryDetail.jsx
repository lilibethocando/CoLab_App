import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CalendarIcon, DownloadIcon, SaveIcon, ShareIcon } from '@heroicons/react/outline';

const baseURL =
    process.env.NODE_ENV === 'production'
        ? 'https://colab-app.onrender.com'
        : 'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

const ItineraryDetail = () => {
    const { id } = useParams();
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItinerary = async () => {
            try {
                const response = await axiosInstance.get(`/itinerary/${id}`);
                console.log('API Response:', response.data); // Debugging log
                setItinerary(response.data);
            } catch (error) {
                console.error('There was an error fetching the itinerary!', error);
                setError('Failed to fetch itinerary');
            } finally {
                setLoading(false);
            }
        };

        fetchItinerary();
    }, [id]);

    const handleSave = async () => {
        try {
            const response = await axiosInstance.post('/save/itinerary', itinerary);
            alert('Itinerary saved successfully!');
        } catch (error) {
            console.error('Error saving itinerary:', error);
            alert('Failed to save itinerary.');
        }
    };

    const handleDownload = async () => {
        try {
            // Perform API call to download the itinerary
            const response = await axiosInstance.get(`/itinerary/${id}/download`, {
                responseType: 'blob', // Response type is blob for downloading files
            });
            
            // Create a URL for the blob data
            const url = window.URL.createObjectURL(new Blob([response.data]));
            
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${itinerary.name}.csv`); // Set the filename
            document.body.appendChild(link);
            
            // Trigger the download
            link.click();
            
            // Clean up
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading itinerary:', error);
        }
    };

    const handleShare = async () => {
        try {
            const response = await axiosInstance.get(`/itinerary/${id}/share`);
            const { download_url } = response.data;
            navigator.clipboard.writeText(download_url);
            alert('Download link copied to clipboard!');
        } catch (error) {
            console.error('Error sharing itinerary:', error);
            alert('Failed to share itinerary.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80" style={{ backgroundColor: '#fff', zIndex: '1000' }}>
            <div className="container px-4 mx-auto relative text-sm">
                <div className="w-full h-full bg-gray-100 p-6">
                    <div className="w-full h-24 bg-white flex items-center justify-between px-14">
                        <h1 className="text-2xl">{itinerary.name}</h1>
                        <div className="flex items-center gap-4">
                            <button onClick={handleSave} className="button">
                                <SaveIcon className="h-5 w-5 mr-1 text-black" />Save
                            </button>
                            <button onClick={handleDownload} className="button">
                                <DownloadIcon className="h-5 w-5 mr-1 text-black" />Download
                            </button>
                            <button onClick={handleShare} className="button">
                                <ShareIcon className="h-5 w-5 mr-1 text-black" />Share
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {itinerary.items.map((place) => (
                            <div key={place.id} className="flex flex-col items-start">
                                <h2 className="text-lg mb-1">{place.name}</h2>
                                <img className="w-24 h-24 object-cover mb-2" src={place.photo_url} alt={place.name} />
                                <input type="text" placeholder="Add notes..." className="border border-gray-300 p-2 rounded-lg mb-2" />
                                <div className="flex items-center relative">
                                    <input type="text" placeholder="Add day" className="border border-gray-300 p-2 rounded-lg pr-10" />
                                    <CalendarIcon className="h-5 w-5 absolute right-3 top-3 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItineraryDetail;
