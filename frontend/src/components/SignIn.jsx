import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

// Create an Axios instance with the required configuration
const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://colab-app.onrender.com' : 'http://127.0.0.1:5000',
    withCredentials: true,
});

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/signin', formData);
            console.log(response.data);
            setSuccessMessage('You have successfully signed in!');
            setErrorMessage(''); // Clear any previous errors

            // Redirect to the main page
            navigate('/itinerary'); // Placeholder route for the main page
        } catch (error) {
            console.error(error);
            setSuccessMessage(''); // Clear any previous success messages
            setErrorMessage(error.response?.data?.message || 'An error occurred during sign in.');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSignupRedirect = () => {
        navigate('/signup');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover background-image">
            <form onSubmit={handleSubmit} style={{ width: '670px', background: '#F0F5F7', borderRadius: '7px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <h1 style={{ color: 'black', fontSize: '30px', fontFamily: 'Roboto', fontWeight: '500', marginBottom: '16px', alignSelf: 'flex-start' }}>Sign In</h1>
                <div style={{ width: '100%', marginBottom: '32px', textAlign: 'left' }}>
                    <div style={{ color: 'black', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>If you don’t have an account register</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ color: 'black', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word', marginRight: '5px' }}>You can</div>
                        <div style={{ color: '#235778', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '600', cursor: 'pointer' }} onClick={handleSignupRedirect}>Register here!</div>
                    </div>
                </div>
                <div style={{ marginBottom: '32px', position: 'relative', width: '100%' }}>
                    <label htmlFor="email" style={{ color: '#999999', fontSize: '13px', fontFamily: 'Roboto', fontWeight: '500', marginBottom: '8px' }}>Email</label>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <i className="far fa-envelope" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999999' }}></i>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '8px 8px 8px 40px', fontSize: '16px', borderRadius: '4px', border: '1px solid #999999' }} />
                    </div>
                </div>
                <div style={{ marginBottom: '32px', position: 'relative', width: '100%' }}>
                    <label htmlFor="password" style={{ color: '#999999', fontSize: '13px', fontFamily: 'Roboto', fontWeight: '500', marginBottom: '8px' }}>Password</label>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <i className="fas fa-lock" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999999' }}></i>
                        <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} style={{ width: '100%', padding: '8px 40px 8px 40px', fontSize: '16px', borderRadius: '4px', border: '1px solid #999999' }} />
                        <i className={showPassword ? 'far fa-eye-slash' : 'far fa-eye'} onClick={toggleShowPassword} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999999', cursor: 'pointer' }}></i>
                    </div>
                </div>
                <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', width: '100%' }}>
                    <input type="checkbox" id="rememberMe" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} style={{ marginRight: '8px' }} />
                    <label htmlFor="rememberMe" style={{ color: '#999999', fontSize: '13px', fontFamily: 'Roboto', fontWeight: '500' }}>Remember me</label>
                </div>
                <button type="submit" style={{ width: '100%', padding: '14px', fontSize: '17px', fontFamily: 'Roboto', fontWeight: '500', color: 'white', background: '#235778', borderRadius: '32px', border: 'none', cursor: 'pointer' }}>Sign In</button>
                {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
                {successMessage && <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>}
            </form>
        </div>
    );
};

export default SignIn;
