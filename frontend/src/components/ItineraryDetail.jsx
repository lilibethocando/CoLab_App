import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CalendarIcon, DownloadIcon, SaveIcon, ShareIcon } from '@heroicons/react/outline';

const baseURL =
    process.env.NODE_ENV === 'production' ? 'https://colab-app.onrender.com' : 'http://localhost:5000';

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
                setItinerary(response.data);
            } catch (error) {
                console.error('Failed to fetch itinerary:', error);
                setError('Failed to fetch itinerary');
            } finally {
                setLoading(false);
            }
        };

        fetchItinerary();
    }, [id]);

    const handleDeletePlace = async (itineraryId, placeId) => {
        try {
            await axiosInstance.delete(`/itineraries/${itineraryId}/places/${placeId}`);
            setItinerary(prevState => ({
                ...prevState,
                items: prevState.items.filter(place => place.id !== placeId)
            }));
        } catch (error) {
            console.error('Failed to delete place:', error);
            setError('Failed to delete place');
        }
    };

    const handleSave = async () => {
        try {
            const response = await axiosInstance.post('/save/itinerary', {
                id: itinerary.id,
                name: itinerary.name,
                items: itinerary.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    notes: item.notes,
                    day: item.day,
                })),
            });
            alert('Itinerary saved successfully!');
        } catch (error) {
            console.error('Error saving itinerary:', error);
            alert('Failed to save itinerary.');
        }
    };

    const handleNoteChange = (placeId, index, value) => {
        setItinerary(prevState => {
            const newItems = [...prevState.items];
            newItems[index].notes = [{ content: value }];
            return { ...prevState, items: newItems };
        });
    };

    const handleDayChange = (placeId, index, value) => {
        setItinerary(prevState => {
            const newItems = [...prevState.items];
            newItems[index].day = value;
            return { ...prevState, items: newItems };
        });
    };

    const handleDownload = async () => {
        try {
            const response = await axiosInstance.get(`/itinerary/${id}/download`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${itinerary.name}.csv`);
            document.body.appendChild(link);
            link.click();
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
                            <button onClick={handleSave} className="button rounded-lg">
                                <SaveIcon className="h-5 w-5 mr-1 text-black" />Save
                            </button>
                            <button onClick={handleDownload} className="button rounded-lg">
                                <DownloadIcon className="h-5 w-5 mr-1 text-black" />Download
                            </button>
                            <button onClick={handleShare} className="button rounded-lg">
                                <ShareIcon className="h-5 w-5 mr-1 text-black" />Share
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {itinerary.items.map((place, index) => (
                            <div key={place.id} className="flex flex-col items-start">
                                <h2 className="text-lg mb-1">{place.name}</h2>
                                <img className="w-24 h-24 object-cover mb-2" src={place.photo_url} alt={place.name} />
                                <input
                                    type="text"
                                    placeholder="Add notes..."
                                    className="border border-gray-300 p-2 rounded-lg mb-2"
                                    value={place.notes?.[0]?.content || ''}
                                    onChange={(e) => handleNoteChange(place.id, index, e.target.value)}
                                />
                                <div className="flex items-center relative">
                                    <input
                                        type="text"
                                        placeholder="Add day"
                                        className="border border-gray-300 p-2 rounded-lg pr-10"
                                        value={place.day || ''}
                                        onChange={(e) => handleDayChange(place.id, index, e.target.value)}
                                    />
                                    <CalendarIcon className="h-5 w-5 absolute right-3 top-3 text-gray-400 pointer-events-none" />
                                </div>
                                <small className="text-gray-500 mt-2">Format: YYYY-MM-DD</small>
                                <button
                                    onClick={() => handleDeletePlace(itinerary.id, place.id)}
                                    className="text-red-600 text-sm mt-2"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItineraryDetail;
