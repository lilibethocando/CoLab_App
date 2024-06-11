import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



const SecondNavbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    }

    const axiosInstance = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? 'https://colab-app.onrender.com' : 'http://localhost:5000',
        withCredentials: true,
    });

    const handleSignOut = async () => {
        try {
            const response = await axiosInstance.post('/signout');
            console.log(response.data.message);
            navigate('/');  // redirect to the landing page
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80" style={{ backgroundColor: '#fff', zIndex: '1000' }}>
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img className="h-12 w-12 mr-2" src={logo} alt="Company Logo" />
                        <Link to="/" className="text-black">
                            <span className="text-xl tracking-tight">TripPlanner</span>
                        </Link>
                    </div>
                    <div className="hidden lg:flex justify-center space-x-12 items-center">
                        <Link to="/itinerary" className='py-2 px-3 text-black'>
                            Plan a Trip
                        </Link>
                        <Link to="/myitineraries" className='py-2 px-3 text-black'>
                            My Itineraries
                        </Link>
                        <button onClick={handleSignOut} className="py-2 px-3 rounded-md" style={{ backgroundColor: '#235778', color: '#ffffff' }}>
                            Sign Out
                        </button>
                    </div>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleNavbar}>
                            {mobileDrawerOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
                {mobileDrawerOpen && (
                    <div className="fixed right-0 z-20 bg-neutral-200 w-full p-12 flex flex-col justify-center items-center lg:hidden">
                        <ul>
                            <li className='py-4'>
                                <Link to="/" onClick={() => setMobileDrawerOpen(false)}>Home</Link>
                            </li>
                            <li className='py-4'>
                                <Link to="/plan" onClick={() => setMobileDrawerOpen(false)}>Plan a Trip</Link>
                            </li>
                            <li className='py-4'>
                                <Link to="/itineraries" onClick={() => setMobileDrawerOpen(false)}>My Itineraries</Link>
                            </li>
                        </ul>
                        <div className="flex space-x-6">
                            <button onClick={() => { handleSignOut(); setMobileDrawerOpen(false); }} className='bg-gradient-to-r from-green-400 to-green-200 py-2 px-3 rounded-md'>
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default SecondNavbar;
