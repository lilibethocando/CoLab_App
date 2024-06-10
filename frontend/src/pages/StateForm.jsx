import React, { useState, useEffect } from 'react';
import axios from 'axios';



// Create an Axios instance with the required configuration
const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://colab-app.onrender.com' : 'http://localhost:5000',
    withCredentials: true,
});

function StateForm() {
    const [states, setStates] = useState([]);
    const [stateInput, setStateInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all states from the server when the component mounts
        async function fetchStates() {
            try {
                const response = await axios.get('/states');
                setStates(response.data);
            } catch (error) {
                console.error('Error fetching states:', error);
                setError('An error occurred while fetching states.');
            } finally {
                setLoading(false);
            }
        }
        fetchStates();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!stateInput.trim()) {
            alert('Please enter a state name.');
            return;
        }

        try {
            const response = await axios.post('/states', { name: stateInput.trim() });
            alert(response.data.message);
            // Fetch states again to update the list
            const updatedStatesResponse = await axios.get('/states');
            setStates(updatedStatesResponse.data);
            // Clear input field
            setStateInput('');
        } catch (error) {
            console.error('Error submitting state:', error);
            alert('An error occurred while submitting the state.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Enter a State</h1>
            {/* Display existing states */}
            <ul>
                {Array.isArray(states) && states.map(state => (
                    <li key={state.id}>{state.name}</li>
                ))}
            </ul>
            {/* Form to submit a new state */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="state">State:</label>
                <input 
                    type="text" 
                    value={stateInput} 
                    onChange={(e) => setStateInput(e.target.value)} 
                    placeholder="Enter state" 
                />
                <button type="submit">Save State</button>
            </form>
        </div>
    );
}

export default StateForm;
